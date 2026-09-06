const { db } = require("../config/database");

/**
 * List all opportunities with optional filtering
 */
function getOpportunities(req, res) {
  const { type, workMode } = req.query;

  let query = "SELECT * FROM opportunities WHERE 1=1";
  const params = [];

  if (type && type !== "all") {
    query += " AND type = ?";
    params.push(type);
  }

  if (workMode && workMode !== "all") {
    query += " AND workMode = ?";
    params.push(workMode);
  }

  query += " ORDER BY matchScore DESC";

  const opportunities = db.prepare(query).all(...params);

  return res.json({
    success: true,
    opportunities: opportunities.map(opp => ({
      ...opp,
      requiredSkills: JSON.parse(opp.requiredSkills || "[]"),
      matchedSkills: JSON.parse(opp.matchedSkills || "[]"),
      missingSkills: JSON.parse(opp.missingSkills || "[]"),
      courseworkSynergies: JSON.parse(opp.courseworkSynergies || "[]")
    }))
  });
}

/**
 * Get opportunity by ID
 */
function getOpportunityById(req, res) {
  const { id } = req.params;
  const opp = db.prepare("SELECT * FROM opportunities WHERE id = ?").get(id);

  if (!opp) {
    return res.status(404).json({ success: false, message: "Opportunity not found" });
  }

  return res.json({
    success: true,
    opportunity: {
      ...opp,
      requiredSkills: JSON.parse(opp.requiredSkills || "[]"),
      matchedSkills: JSON.parse(opp.matchedSkills || "[]"),
      missingSkills: JSON.parse(opp.missingSkills || "[]"),
      courseworkSynergies: JSON.parse(opp.courseworkSynergies || "[]")
    }
  });
}

/**
 * Get student applications
 */
function getApplications(req, res) {
  const applications = db.prepare("SELECT * FROM applications WHERE studentId = ? ORDER BY appliedDate DESC").all("prof-ananya");

  return res.json({
    success: true,
    applications: applications.map(app => ({
      ...app,
      stageTimeline: JSON.parse(app.stageTimeline || "{}")
    }))
  });
}

/**
 * Apply to an opportunity
 */
function applyToOpportunity(req, res) {
  const { opportunityId } = req.body;

  if (!opportunityId) {
    return res.status(400).json({ success: false, message: "Opportunity ID is required" });
  }

  const opp = db.prepare("SELECT * FROM opportunities WHERE id = ?").get(opportunityId);
  if (!opp) {
    return res.status(404).json({ success: false, message: "Opportunity not found" });
  }

  // Check if already applied
  const existing = db.prepare("SELECT * FROM applications WHERE studentId = ? AND opportunityId = ?").get("prof-ananya", opportunityId);
  if (existing) {
    return res.status(400).json({ success: false, message: `Already applied to ${opp.company}` });
  }

  const today = new Date().toISOString().split("T")[0];
  const appId = `app-${Date.now()}`;

  const newApp = {
    id: appId,
    studentId: "prof-ananya",
    opportunityId: opp.id,
    roleTitle: opp.title,
    company: opp.company,
    companyLogo: opp.companyLogo,
    type: opp.type,
    appliedDate: today,
    status: "applied",
    stageTimeline: JSON.stringify({ applied: today }),
    interviewerNote: "Application submitted successfully. Under initial profile screening.",
    feedback: null
  };

  db.prepare(`
    INSERT INTO applications (
      id, studentId, opportunityId, roleTitle, company, companyLogo, type, appliedDate, status, stageTimeline, interviewerNote, feedback
    ) VALUES (
      @id, @studentId, @opportunityId, @roleTitle, @company, @companyLogo, @type, @appliedDate, @status, @stageTimeline, @interviewerNote, @feedback
    )
  `).run(newApp);

  // Increment applicants count
  db.prepare("UPDATE opportunities SET applicantsCount = applicantsCount + 1 WHERE id = ?").run(opp.id);

  return res.status(201).json({
    success: true,
    message: `Successfully applied to ${opp.title} at ${opp.company}`,
    application: {
      ...newApp,
      stageTimeline: JSON.parse(newApp.stageTimeline)
    }
  });
}

module.exports = {
  getOpportunities,
  getOpportunityById,
  getApplications,
  applyToOpportunity
};
