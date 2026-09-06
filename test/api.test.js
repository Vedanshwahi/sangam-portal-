const path = require("path");
const fs = require("fs");

// Use an isolated test database for clean, repeatable test runs
const testDbPath = path.join(__dirname, "test_sangam.db");
if (fs.existsSync(testDbPath)) {
  try { fs.unlinkSync(testDbPath); } catch {}
  try { fs.unlinkSync(testDbPath + "-wal"); } catch {}
  try { fs.unlinkSync(testDbPath + "-shm"); } catch {}
}
process.env.DB_PATH = testDbPath;
process.env.NODE_ENV = "test";

const { app } = require("../backend/src/server");
let server;
const PORT = 3999;
const BASE = `http://localhost:${PORT}/api`;

async function runTests() {
  console.log("==================================================");
  console.log("🧪 Starting Sangam Backend Integration Tests");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAILED: ${message}`);
      failed++;
    }
  }

  // Start test server
  await new Promise((resolve) => {
    server = app.listen(PORT, () => {
      console.log(`Test server running on port ${PORT}\n`);
      resolve();
    });
  });

  try {
    // 1. Health check
    console.log("[1/13] Health & Diagnostic Endpoints");
    const healthRes = await fetch(`${BASE}/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, "GET /api/health returns HTTP 200");
    assert(healthData.status === "healthy", "Healthcheck status is 'healthy'");
    assert(healthData.database.connected === true, "SQLite database connection is verified");

    // 2. Bootstrap
    console.log("\n[2/13] Bootstrap Initial State");
    const bootRes = await fetch(`${BASE}/bootstrap`);
    const bootData = await bootRes.json();
    assert(bootRes.status === 200, "GET /api/bootstrap returns HTTP 200");
    assert(bootData.success === true, "Bootstrap payload returned successfully");
    assert(bootData.data.studentProfile.name === "Ananya Sharma", "Bootstrap includes studentProfile");
    assert(bootData.data.opportunities.length >= 4, "Bootstrap includes opportunities");
    assert(bootData.data.collegeStudents.length >= 10, "Bootstrap includes college student roster");

    // 3. Auth
    console.log("\n[3/13] Authentication & Roles");
    for (const role of ["student", "industry", "college", "faculty"]) {
      const loginRes = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role })
      });
      const loginData = await loginRes.json();
      assert(loginRes.status === 200, `POST /api/auth/login for '${role}' returns HTTP 200`);
      assert(loginData.user.role === role, `Returned user has role '${role}'`);
    }

    // 4. Student Profile & Calibration
    console.log("\n[4/13] Student Profile & Calibration");
    const profRes = await fetch(`${BASE}/student/profile`);
    const profData = await profRes.json();
    assert(profRes.status === 200, "GET /api/student/profile returns HTTP 200");
    assert(profData.profile.rollNo === "22CS084", "Profile rollNo matches 22CS084");

    const updateProfRes = await fetch(`${BASE}/student/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        weeklyLearningHours: 15,
        targetCareerRole: "Staff Cloud Engineer"
      })
    });
    const updateProfData = await updateProfRes.json();
    assert(updateProfRes.status === 200, "PUT /api/student/profile returns HTTP 200");
    assert(updateProfData.profile.weeklyLearningHours === 15, "Profile updated weeklyLearningHours to 15");
    assert(updateProfData.profile.targetCareerRole === "Staff Cloud Engineer", "Profile updated targetCareerRole");

    // 5. Skills & Radar
    console.log("\n[5/13] Skills & Radar Competencies");
    const skillsRes = await fetch(`${BASE}/student/skills`);
    const skillsData = await skillsRes.json();
    assert(skillsRes.status === 200, "GET /api/student/skills returns HTTP 200");
    assert(skillsData.skills.length === 6, "Returns exactly 6 core competency axes");

    // 6. Roadmap & Milestone Toggling
    console.log("\n[6/13] Roadmap Quest & Milestone Engine");
    const roadRes = await fetch(`${BASE}/student/roadmap`);
    const roadData = await roadRes.json();
    assert(roadRes.status === 200, "GET /api/student/roadmap returns HTTP 200");
    assert(roadData.roadmap.length === 5, "Returns 5 weekly sprint milestones");

    // Toggle Week 3 milestone (id: rw-3)
    const initialScore = updateProfData.profile.overallReadiness;
    const toggleRes = await fetch(`${BASE}/student/roadmap/rw-3/toggle`, { method: "POST" });
    const toggleData = await toggleRes.json();
    assert(toggleRes.status === 200, "POST /api/student/roadmap/rw-3/toggle returns HTTP 200");
    assert(toggleData.overallReadiness > initialScore, `Readiness index automatically recalculated (+${toggleData.overallReadiness - initialScore}%)`);

    // 7. Weak-Skill Reassessment
    console.log("\n[7/13] Targeted Weak-Skill Diagnostic Reassessment");
    const reassessQRes = await fetch(`${BASE}/student/reassessment`);
    const reassessQData = await reassessQRes.json();
    assert(reassessQRes.status === 200, "GET /api/student/reassessment returns HTTP 200");
    assert(reassessQData.questions.length === 3, "Returns 3 weak-skill diagnostic questions");

    const completeReRes = await fetch(`${BASE}/student/reassessment/complete`, { method: "POST" });
    const completeReData = await completeReRes.json();
    assert(completeReRes.status === 200, "POST /api/student/reassessment/complete returns HTTP 200");
    assert(completeReData.overallReadiness >= completeReData.previousReadiness + 9, "Overall readiness jumped by +9%");
    const dockerSkill = completeReData.skills.find(s => s.id === "sk-5");
    assert(dockerSkill && dockerSkill.currentProficiency === 82 && dockerSkill.type === "strength", "Docker competency successfully upgraded to Strength (82%)");

    // 8. Soft Skills Voice Studio
    console.log("\n[8/13] Soft Skills Articulation Analysis");
    const voiceRes = await fetch(`${BASE}/student/soft-skills/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transcript: "In my recent capstone project, I led the transition from synchronous HTTP polling to Redis Pub/Sub, reducing p95 database latency by 42%.",
        durationSeconds: 45
      })
    });
    const voiceData = await voiceRes.json();
    assert(voiceRes.status === 200, "POST /api/student/soft-skills/analyze returns HTTP 200");
    assert(voiceData.analysis.overallScore >= 80, "Verbal score calculated within optimal tier");
    assert(voiceData.analysis.metrics.paceWpm >= 100, `Speaking pace tracked at ${voiceData.analysis.metrics.paceWpm} WPM`);

    // 9. Public Portfolio
    console.log("\n[9/13] Public Shareable Portfolio");
    const portRes = await fetch(`${BASE}/student/portfolio/22cs084`);
    const portData = await portRes.json();
    assert(portRes.status === 200, "GET /api/student/portfolio/22cs084 returns HTTP 200");
    assert(portData.portfolio.profile.name === "Ananya Sharma", "Public portfolio displays verified candidate name");
    assert(portData.portfolio.projects.length >= 3, "Public portfolio includes verified showcase projects");

    // 10. Opportunities & Applications
    console.log("\n[10/13] Opportunities & 1-Click Applications");
    const oppsRes = await fetch(`${BASE}/opportunities?type=internship`);
    const oppsData = await oppsRes.json();
    assert(oppsRes.status === 200, "GET /api/opportunities?type=internship returns HTTP 200");
    assert(oppsData.opportunities.every(o => o.type === "internship"), "Filtered correctly by opportunity type");

    // Apply for Zerodha (opp-4)
    const applyRes = await fetch(`${BASE}/opportunities/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ opportunityId: "opp-4" })
    });
    const applyData = await applyRes.json();
    assert(applyRes.status === 201, "POST /api/opportunities/apply returns HTTP 201 Created");
    assert(applyData.application.company === "Zerodha Technology Guild", "Application recorded with company name");

    // Verify application in list
    const myAppsRes = await fetch(`${BASE}/opportunities/user/applications`);
    const myAppsData = await myAppsRes.json();
    assert(myAppsData.applications.some(a => a.opportunityId === "opp-4"), "New application appears in student application tracker");

    // 11. Industry Candidate Pipeline & Job Creation
    console.log("\n[11/13] Industry Pipeline & Posting Manager");
    const candsRes = await fetch(`${BASE}/industry/candidates?status=all`);
    const candsData = await candsRes.json();
    assert(candsRes.status === 200, "GET /api/industry/candidates returns HTTP 200");
    assert(candsData.candidates.length >= 4, "Industry recruiter receives ranked candidates");

    // Update candidate status to 'interview'
    const updateCandRes = await fetch(`${BASE}/industry/candidates/cand-2/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "interview" })
    });
    const updateCandData = await updateCandRes.json();
    assert(updateCandRes.status === 200, "PATCH /api/industry/candidates/:id/status returns HTTP 200");
    assert(updateCandData.candidate.status === "interview", "Candidate status transitioned to 'interview'");

    // Create a new posting
    const createPostRes = await fetch(`${BASE}/industry/postings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Distributed AI Platform Intern",
        type: "internship",
        department: "AI Research & Systems",
        openings: 3,
        stipend: "₹50,000 / month",
        location: "Bengaluru (Hybrid)",
        requiredSkills: ["Python", "FastAPI", "Docker", "PyTorch"]
      })
    });
    const createPostData = await createPostRes.json();
    assert(createPostRes.status === 201, "POST /api/industry/postings returns HTTP 201");
    assert(createPostData.posting.title === "Distributed AI Platform Intern", "Posting created successfully");
    assert(createPostData.opportunity.id !== undefined, "Automatically syndicated into public opportunities table");

    // 12. College Institutional Analytics & CSV Batch Import
    console.log("\n[12/13] College Institutional Analytics & CSV Import");
    const collegeOverRes = await fetch(`${BASE}/college/overview`);
    const collegeOverData = await collegeOverRes.json();
    assert(collegeOverRes.status === 200, "GET /api/college/overview returns HTTP 200");
    assert(collegeOverData.stats.totalStudents >= 10, "Overview tracks total students");
    assert(collegeOverData.stats.averageReadiness > 0, "Computes cohort average readiness score");

    // Batch CSV Import
    const importRes = await fetch(`${BASE}/college/students/import`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        students: [
          { rollNo: "22CS901", name: "Siddharth Rao", email: "siddharth.r@apex.edu.in", branch: "CSE", academicYear: "4th Year", cgpa: 9.1, readinessScore: 88, placementStatus: "Placed" },
          { rollNo: "22CS902", name: "Isha Kapoor", email: "isha.k@apex.edu.in", branch: "CSE", academicYear: "3rd Year", cgpa: 8.5, readinessScore: 79, placementStatus: "In Interview" }
        ]
      })
    });
    const importData = await importRes.json();
    assert(importRes.status === 201, "POST /api/college/students/import returns HTTP 201");
    assert(importData.importedCount === 2, "Imported exactly 2 new students");

    const sampleCsvRes = await fetch(`${BASE}/college/sample-csv`);
    const sampleCsvText = await sampleCsvRes.text();
    assert(sampleCsvRes.status === 200, "GET /api/college/sample-csv returns HTTP 200");
    assert(sampleCsvText.includes("RollNo,Name,Email"), "Sample CSV contains valid headers");

    // 13. Faculty R&D Grants & Proposals
    console.log("\n[13/13] Faculty R&D Grants & Collaboration Proposals");
    const facOverRes = await fetch(`${BASE}/faculty/overview`);
    const facOverData = await facOverRes.json();
    assert(facOverRes.status === 200, "GET /api/faculty/overview returns HTTP 200");
    assert(facOverData.overview.activeGrantsAmount === "₹22.6 Lakhs", "Faculty overview returns active grant metrics");

    // Apply for FDP
    const applyFacRes = await fetch(`${BASE}/faculty/opportunities/fop-1/apply`, { method: "POST" });
    const applyFacData = await applyFacRes.json();
    assert(applyFacRes.status === 200, "POST /api/faculty/opportunities/:id/apply returns HTTP 200");
    assert(applyFacData.opportunity.status === "applied", "Faculty opportunity status changed to 'applied'");

    // Lodge a new proposal
    const createPropRes = await fetch(`${BASE}/faculty/proposals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "National GenAI Campus Hackathon 2026",
        type: "hackathon_partnership",
        industryPartner: "Google Research India",
        department: "Department of AI & Data Science",
        summary: "Organizing 36-hour national hackathon on Edge LLM optimization with campus hardware grants.",
        budgetEstimate: "₹3,50,000"
      })
    });
    const createPropData = await createPropRes.json();
    assert(createPropRes.status === 201, "POST /api/faculty/proposals returns HTTP 201");
    assert(createPropData.proposal.title === "National GenAI Campus Hackathon 2026", "Proposal successfully lodged");

    console.log("\n==================================================");
    console.log(`🎉 ALL TESTS COMPLETED: ${passed} Passed, ${failed} Failed`);
    console.log("==================================================");

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("Test execution encountered an unhandled error:", err);
    process.exit(1);
  } finally {
    if (server) {
      server.close();
    }
  }
}

runTests();
