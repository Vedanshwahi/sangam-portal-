const { db } = require("../config/database");

/**
 * Get faculty research overview metrics
 */
function getOverview(req, res) {
  const grants = db.prepare("SELECT * FROM faculty_opportunities WHERE status = 'applied' OR status = 'open'").all();
  const proposals = db.prepare("SELECT * FROM faculty_proposals").all();

  return res.json({
    success: true,
    overview: {
      activeGrantsAmount: "₹22.6 Lakhs",
      activeGrantsCount: 3,
      mentoredCapstonesCount: 18,
      fdpCertificationsCount: 4,
      publicationsCount: 6,
      proposalsTotal: proposals.length
    }
  });
}

/**
 * Get faculty opportunities feed (FDPs, consultancies, grants)
 */
function getOpportunities(req, res) {
  const { type } = req.query;

  let query = "SELECT * FROM faculty_opportunities WHERE 1=1";
  const params = [];

  if (type && type !== "all") {
    query += " AND type = ?";
    params.push(type);
  }

  query += " ORDER BY deadline ASC";

  const opportunities = db.prepare(query).all(...params);

  return res.json({
    success: true,
    opportunities: opportunities.map(opp => ({
      ...opp,
      deliverables: JSON.parse(opp.deliverables || "[]")
    }))
  });
}

/**
 * Apply for a faculty opportunity
 */
function applyOpportunity(req, res) {
  const { id } = req.params;
  const opp = db.prepare("SELECT * FROM faculty_opportunities WHERE id = ?").get(id);

  if (!opp) {
    return res.status(404).json({ success: false, message: "Faculty opportunity not found" });
  }

  db.prepare("UPDATE faculty_opportunities SET status = 'applied' WHERE id = ?").run(id);

  const updated = db.prepare("SELECT * FROM faculty_opportunities WHERE id = ?").get(id);

  return res.json({
    success: true,
    message: `Application submitted for "${opp.title}". Sponsor notified.`,
    opportunity: {
      ...updated,
      deliverables: JSON.parse(updated.deliverables || "[]")
    }
  });
}

/**
 * Get faculty collaboration proposals
 */
function getProposals(req, res) {
  const proposals = db.prepare("SELECT * FROM faculty_proposals ORDER BY submittedDate DESC").all();

  return res.json({
    success: true,
    proposals
  });
}

/**
 * Lodge a new industry workshop or research proposal
 */
function createProposal(req, res) {
  const { title, type, industryPartner, department, summary, budgetEstimate } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: "Proposal title is required" });
  }

  const today = new Date().toISOString().split("T")[0];
  const proposalId = `prop-${Date.now()}`;

  const newProposal = {
    id: proposalId,
    title,
    type: type || "guest_lecture",
    industryPartner: industryPartner || "Nexora Technologies",
    submittedDate: today,
    status: "submitted",
    department: department || "Department of Computer Science & Engineering",
    summary: summary || "Collaborative initiative connecting industry engineering leads with undergraduate researchers.",
    budgetEstimate: budgetEstimate || "₹75,000 (Industry Sponsored)"
  };

  db.prepare(`
    INSERT INTO faculty_proposals (id, title, type, industryPartner, submittedDate, status, department, summary, budgetEstimate)
    VALUES (@id, @title, @type, @industryPartner, @submittedDate, @status, @department, @summary, @budgetEstimate)
  `).run(newProposal);

  return res.status(201).json({
    success: true,
    message: `Collaboration proposal "${title}" submitted to ${newProposal.industryPartner}.`,
    proposal: newProposal
  });
}

module.exports = {
  getOverview,
  getOpportunities,
  applyOpportunity,
  getProposals,
  createProposal
};
