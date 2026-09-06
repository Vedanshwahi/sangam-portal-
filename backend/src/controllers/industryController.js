const { db } = require("../config/database");

/**
 * Get AI-ranked candidate pipeline with search and filter
 */
function getCandidates(req, res) {
  const { status, q } = req.query;

  let query = "SELECT * FROM candidates WHERE 1=1";
  const params = [];

  if (status && status !== "all") {
    query += " AND status = ?";
    params.push(status);
  }

  if (q) {
    const searchTerm = `%${q.toLowerCase()}%`;
    query += " AND (LOWER(name) LIKE ? OR LOWER(college) LIKE ? OR LOWER(branch) LIKE ?)";
    params.push(searchTerm, searchTerm, searchTerm);
  }

  query += " ORDER BY matchScore DESC, cgpa DESC";

  const candidates = db.prepare(query).all(...params);

  return res.json({
    success: true,
    candidates: candidates.map(c => ({
      ...c,
      topSkills: JSON.parse(c.topSkills || "[]")
    }))
  });
}

/**
 * Update candidate recruitment status
 */
function updateCandidateStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "shortlisted", "interview", "rejected", "selected"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(", ")}` });
  }

  const candidate = db.prepare("SELECT * FROM candidates WHERE id = ?").get(id);
  if (!candidate) {
    return res.status(404).json({ success: false, message: "Candidate not found" });
  }

  db.prepare("UPDATE candidates SET status = ? WHERE id = ?").run(status, id);

  // If candidate is Ananya Sharma, sync with student applications
  if (candidate.name === "Ananya Sharma") {
    db.prepare("UPDATE applications SET status = ? WHERE studentId = 'prof-ananya'").run(status);
  }

  const updated = db.prepare("SELECT * FROM candidates WHERE id = ?").get(id);

  return res.json({
    success: true,
    message: `${candidate.name} status updated to "${status.toUpperCase()}"`,
    candidate: {
      ...updated,
      topSkills: JSON.parse(updated.topSkills || "[]")
    }
  });
}

/**
 * Get company job postings
 */
function getPostings(req, res) {
  const postings = db.prepare("SELECT * FROM industry_postings ORDER BY postedDate DESC").all();

  return res.json({
    success: true,
    postings: postings.map(p => ({
      ...p,
      requiredSkills: JSON.parse(p.requiredSkills || "[]")
    }))
  });
}

/**
 * Create a new campus posting and automatically publish it to student opportunities
 */
function createPosting(req, res) {
  const { title, type, department, openings, stipend, location, requiredSkills } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: "Title is required" });
  }

  const today = new Date().toISOString().split("T")[0];
  const postId = `post-${Date.now()}`;
  const skillsArray = Array.isArray(requiredSkills) ? requiredSkills : ["React", "Node.js", "Docker"];

  const newPosting = {
    id: postId,
    title,
    type: type || "internship",
    department: department || "Cloud Platform Engineering",
    openings: Number(openings) || 2,
    stipend: stipend || "₹45,000 / month",
    location: location || "Bengaluru (Hybrid)",
    status: "active",
    applicantsCount: 0,
    shortlistedCount: 0,
    requiredSkills: JSON.stringify(skillsArray),
    postedDate: today
  };

  db.prepare(`
    INSERT INTO industry_postings (
      id, title, type, department, openings, stipend, location, status, applicantsCount, shortlistedCount, requiredSkills, postedDate
    ) VALUES (
      @id, @title, @type, @department, @openings, @stipend, @location, @status, @applicantsCount, @shortlistedCount, @requiredSkills, @postedDate
    )
  `).run(newPosting);

  // Also syndicate to public opportunities table for students
  const oppId = `opp-${Date.now()}`;
  const newOpportunity = {
    id: oppId,
    title,
    company: "Nexora Technologies",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    type: type || "internship",
    workMode: location && location.includes("Remote") ? "Remote" : location && location.includes("Hybrid") ? "Hybrid" : "On-site",
    location: location || "Bengaluru (Hybrid)",
    stipendOrSalary: stipend || "₹45,000 / month",
    duration: "6 Months",
    deadline: "2026-10-30",
    matchScore: 86,
    requiredSkills: JSON.stringify(skillsArray.map(s => ({ name: s, requiredProficiency: 75 }))),
    matchedSkills: JSON.stringify(skillsArray.slice(0, 2)),
    missingSkills: JSON.stringify(skillsArray.slice(2)),
    courseworkSynergies: JSON.stringify(["Syllabus alignment validated by College TPO"]),
    description: `New active opening posted directly by the campus recruitment team for ${department || "Engineering"}.`,
    applicantsCount: 0,
    openings: Number(openings) || 2,
    createdAt: today
  };

  db.prepare(`
    INSERT INTO opportunities (
      id, title, company, companyLogo, type, workMode, location, stipendOrSalary,
      duration, deadline, matchScore, requiredSkills, matchedSkills, missingSkills,
      courseworkSynergies, description, applicantsCount, openings, createdAt
    ) VALUES (
      @id, @title, @company, @companyLogo, @type, @workMode, @location, @stipendOrSalary,
      @duration, @deadline, @matchScore, @requiredSkills, @matchedSkills, @missingSkills,
      @courseworkSynergies, @description, @applicantsCount, @openings, @createdAt
    )
  `).run(newOpportunity);

  return res.status(201).json({
    success: true,
    message: `${title} published live across student dashboards!`,
    posting: {
      ...newPosting,
      requiredSkills: skillsArray
    },
    opportunity: {
      ...newOpportunity,
      requiredSkills: JSON.parse(newOpportunity.requiredSkills),
      matchedSkills: JSON.parse(newOpportunity.matchedSkills),
      missingSkills: JSON.parse(newOpportunity.missingSkills),
      courseworkSynergies: JSON.parse(newOpportunity.courseworkSynergies)
    }
  });
}

module.exports = {
  getCandidates,
  updateCandidateStatus,
  getPostings,
  createPosting
};
