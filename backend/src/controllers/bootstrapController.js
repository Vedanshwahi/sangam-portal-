const { db } = require("../config/database");

/**
 * Bootstrap endpoint providing the complete synchronized state for the Sangam frontend
 */
function getBootstrapData(req, res) {
  try {
    // 1. Users
    const rawUsers = db.prepare("SELECT * FROM users").all();
    const users = {};
    rawUsers.forEach(u => {
      const { password, ...safe } = u;
      users[u.role] = safe;
    });

    // 2. Student Profile
    const rawProfile = db.prepare("SELECT * FROM student_profiles WHERE id = 'prof-ananya'").get();
    const studentProfile = rawProfile ? {
      ...rawProfile,
      interests: JSON.parse(rawProfile.interests || "[]"),
      currentSubjects: JSON.parse(rawProfile.currentSubjects || "[]")
    } : null;

    // 3. Skill Competencies
    const rawSkills = db.prepare("SELECT * FROM skill_competencies WHERE studentId = 'prof-ananya' ORDER BY id ASC").all();
    const skillCompetencies = rawSkills.map(s => ({
      ...s,
      courseworkReinforced: Boolean(s.courseworkReinforced)
    }));

    // 4. Roadmap Weeks
    const rawRoadmap = db.prepare("SELECT * FROM roadmap_weeks WHERE studentId = 'prof-ananya' ORDER BY weekNumber ASC").all();
    const roadmapWeeks = rawRoadmap.map(w => ({
      ...w,
      completed: Boolean(w.completed),
      resources: JSON.parse(w.resources || "[]")
    }));

    // 5. Soft Skills Analysis
    const rawSoft = db.prepare("SELECT * FROM soft_skills_analysis WHERE studentId = 'prof-ananya'").get();
    const softSkillsAnalysis = rawSoft ? {
      ...rawSoft,
      metrics: JSON.parse(rawSoft.metrics || "{}"),
      strengths: JSON.parse(rawSoft.strengths || "[]"),
      improvements: JSON.parse(rawSoft.improvements || "[]")
    } : null;

    // 6. Opportunities
    const rawOpportunities = db.prepare("SELECT * FROM opportunities ORDER BY matchScore DESC").all();
    const opportunities = rawOpportunities.map(opp => ({
      ...opp,
      requiredSkills: JSON.parse(opp.requiredSkills || "[]"),
      matchedSkills: JSON.parse(opp.matchedSkills || "[]"),
      missingSkills: JSON.parse(opp.missingSkills || "[]"),
      courseworkSynergies: JSON.parse(opp.courseworkSynergies || "[]")
    }));

    // 7. Applications
    const rawApps = db.prepare("SELECT * FROM applications WHERE studentId = 'prof-ananya' ORDER BY appliedDate DESC").all();
    const applications = rawApps.map(app => ({
      ...app,
      stageTimeline: JSON.parse(app.stageTimeline || "{}")
    }));

    // 8. Candidates
    const rawCandidates = db.prepare("SELECT * FROM candidates ORDER BY matchScore DESC").all();
    const rankedCandidates = rawCandidates.map(c => ({
      ...c,
      topSkills: JSON.parse(c.topSkills || "[]")
    }));

    // 9. Industry Postings
    const rawPostings = db.prepare("SELECT * FROM industry_postings ORDER BY postedDate DESC").all();
    const industryPostings = rawPostings.map(p => ({
      ...p,
      requiredSkills: JSON.parse(p.requiredSkills || "[]")
    }));

    // 10. College Students
    const collegeStudents = db.prepare("SELECT * FROM college_students ORDER BY readinessScore DESC").all();

    // 11. Faculty Opportunities
    const rawFacOpp = db.prepare("SELECT * FROM faculty_opportunities ORDER BY deadline ASC").all();
    const facultyOpportunities = rawFacOpp.map(fo => ({
      ...fo,
      deliverables: JSON.parse(fo.deliverables || "[]")
    }));

    // 12. Faculty Proposals
    const facultyProposals = db.prepare("SELECT * FROM faculty_proposals ORDER BY submittedDate DESC").all();

    // 13. Notifications
    const rawNotifs = db.prepare("SELECT * FROM notifications ORDER BY id ASC").all();
    const notifications = {
      student: [],
      industry: [],
      college: [],
      faculty: []
    };
    rawNotifs.forEach(n => {
      if (notifications[n.role]) {
        notifications[n.role].push({
          ...n,
          unread: Boolean(n.unread)
        });
      }
    });

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        users,
        studentProfile,
        skillCompetencies,
        roadmapWeeks,
        softSkillsAnalysis,
        opportunities,
        applications,
        rankedCandidates,
        industryPostings,
        collegeStudents,
        facultyOpportunities,
        facultyProposals,
        notifications
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to load bootstrap data: " + err.message
    });
  }
}

module.exports = {
  getBootstrapData
};
