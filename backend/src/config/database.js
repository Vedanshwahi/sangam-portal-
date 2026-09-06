const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");
const seeds = require("../seeds/seedData");

// Determine database path
const defaultDbDir = path.resolve(__dirname, "../../data");
if (!fs.existsSync(defaultDbDir)) {
  fs.mkdirSync(defaultDbDir, { recursive: true });
}

const dbPath = process.env.DB_PATH || path.join(defaultDbDir, "sangam.db");
const db = new Database(dbPath);

// Enable SQLite Write-Ahead Logging for better concurrency and foreign keys
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

/**
 * Initialize database schema and seeds
 */
function initDb() {
  // 1. Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      role TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      title TEXT,
      avatar TEXT,
      institutionOrCompany TEXT,
      password TEXT NOT NULL
    );
  `);

  // 2. Student Profile Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS student_profiles (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      name TEXT NOT NULL,
      avatar TEXT,
      email TEXT,
      rollNo TEXT,
      college TEXT,
      branch TEXT,
      academicYear TEXT,
      currentSemester INTEGER,
      targetCareerRole TEXT,
      weeklyLearningHours INTEGER,
      overallReadiness INTEGER,
      previousReadiness INTEGER,
      lastAssessmentDate TEXT,
      targetReadinessBenchmark INTEGER,
      interests TEXT,
      currentSubjects TEXT,
      FOREIGN KEY (userId) REFERENCES users (id)
    );
  `);

  // 3. Skill Competencies Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS skill_competencies (
      id TEXT PRIMARY KEY,
      studentId TEXT NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      currentProficiency INTEGER NOT NULL,
      requiredProficiency INTEGER NOT NULL,
      type TEXT NOT NULL,
      courseworkReinforced INTEGER DEFAULT 0,
      reinforcedCourse TEXT,
      learningHoursToBridge INTEGER DEFAULT 0
    );
  `);

  // 4. Roadmap Weeks Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS roadmap_weeks (
      id TEXT PRIMARY KEY,
      studentId TEXT NOT NULL,
      weekNumber INTEGER NOT NULL,
      title TEXT NOT NULL,
      topic TEXT NOT NULL,
      estimatedHours INTEGER NOT NULL,
      reinforcedByCoursework TEXT,
      status TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      milestoneProject TEXT,
      readinessBoost INTEGER DEFAULT 0,
      resources TEXT
    );
  `);

  // 5. Diagnostic & Reassessment Questions Tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS diagnostic_questions (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      category TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      question TEXT NOT NULL,
      codeSnippet TEXT,
      options TEXT NOT NULL,
      correctIndex INTEGER NOT NULL,
      explanation TEXT
    );

    CREATE TABLE IF NOT EXISTS reassessment_questions (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      category TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      question TEXT NOT NULL,
      codeSnippet TEXT,
      options TEXT NOT NULL,
      correctIndex INTEGER NOT NULL,
      explanation TEXT
    );
  `);

  // 6. Soft Skills Analysis Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS soft_skills_analysis (
      id TEXT PRIMARY KEY,
      studentId TEXT NOT NULL,
      recordedAt TEXT NOT NULL,
      durationSeconds INTEGER NOT NULL,
      transcript TEXT NOT NULL,
      overallScore INTEGER NOT NULL,
      metrics TEXT NOT NULL,
      strengths TEXT NOT NULL,
      improvements TEXT NOT NULL,
      aiActionableAdvice TEXT NOT NULL
    );
  `);

  // 7. Opportunities Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS opportunities (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      companyLogo TEXT,
      type TEXT NOT NULL,
      workMode TEXT NOT NULL,
      location TEXT NOT NULL,
      stipendOrSalary TEXT NOT NULL,
      duration TEXT,
      deadline TEXT,
      matchScore INTEGER DEFAULT 80,
      requiredSkills TEXT,
      matchedSkills TEXT,
      missingSkills TEXT,
      courseworkSynergies TEXT,
      description TEXT,
      applicantsCount INTEGER DEFAULT 0,
      openings INTEGER DEFAULT 1,
      createdAt TEXT
    );
  `);

  // 8. Applications Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      studentId TEXT NOT NULL,
      opportunityId TEXT NOT NULL,
      roleTitle TEXT NOT NULL,
      company TEXT NOT NULL,
      companyLogo TEXT,
      type TEXT NOT NULL,
      appliedDate TEXT NOT NULL,
      status TEXT NOT NULL,
      stageTimeline TEXT,
      interviewerNote TEXT,
      feedback TEXT,
      FOREIGN KEY (opportunityId) REFERENCES opportunities (id)
    );
  `);

  // 9. Ranked Candidates Table (For Industry Portal)
  db.exec(`
    CREATE TABLE IF NOT EXISTS candidates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      avatar TEXT,
      college TEXT NOT NULL,
      branch TEXT NOT NULL,
      academicYear TEXT NOT NULL,
      cgpa REAL NOT NULL,
      overallReadiness INTEGER NOT NULL,
      matchScore INTEGER NOT NULL,
      targetRole TEXT NOT NULL,
      topSkills TEXT NOT NULL,
      status TEXT NOT NULL,
      appliedFor TEXT NOT NULL,
      appliedDate TEXT NOT NULL,
      resumeSummary TEXT
    );
  `);

  // 10. Industry Postings Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS industry_postings (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      department TEXT NOT NULL,
      openings INTEGER NOT NULL,
      stipend TEXT NOT NULL,
      location TEXT NOT NULL,
      status TEXT NOT NULL,
      applicantsCount INTEGER DEFAULT 0,
      shortlistedCount INTEGER DEFAULT 0,
      requiredSkills TEXT NOT NULL,
      postedDate TEXT NOT NULL
    );
  `);

  // 11. College Students Directory Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS college_students (
      id TEXT PRIMARY KEY,
      rollNo TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      branch TEXT NOT NULL,
      academicYear TEXT NOT NULL,
      cgpa REAL NOT NULL,
      readinessScore INTEGER NOT NULL,
      tier TEXT NOT NULL,
      placementStatus TEXT NOT NULL
    );
  `);

  // 12. Curriculum Gaps Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS curriculum_gaps (
      id TEXT PRIMARY KEY,
      domain TEXT NOT NULL,
      industryDemand TEXT NOT NULL,
      currentSyllabusCoverage TEXT NOT NULL,
      deficit INTEGER NOT NULL,
      affectedBranch TEXT NOT NULL,
      recommendation TEXT NOT NULL
    );
  `);

  // 13. Faculty Opportunities Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS faculty_opportunities (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      sponsor TEXT NOT NULL,
      stipendOrGrant TEXT NOT NULL,
      duration TEXT NOT NULL,
      deadline TEXT NOT NULL,
      domain TEXT NOT NULL,
      description TEXT NOT NULL,
      deliverables TEXT NOT NULL,
      status TEXT NOT NULL
    );
  `);

  // 14. Faculty Proposals Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS faculty_proposals (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      industryPartner TEXT NOT NULL,
      submittedDate TEXT NOT NULL,
      status TEXT NOT NULL,
      department TEXT NOT NULL,
      summary TEXT NOT NULL,
      budgetEstimate TEXT NOT NULL
    );
  `);

  // 15. Notifications Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      role TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      time TEXT NOT NULL,
      icon TEXT,
      color TEXT,
      unread INTEGER DEFAULT 1
    );
  `);

  // Seed default data if users table is empty
  const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
  if (userCount === 0) {
    seedInitialData();
  }
}

/**
 * Seed initial records into SQLite
 */
function seedInitialData() {
  const insertUser = db.prepare(`
    INSERT INTO users (id, role, name, email, title, avatar, institutionOrCompany, password)
    VALUES (@id, @role, @name, @email, @title, @avatar, @institutionOrCompany, @password)
  `);

  Object.values(seeds.initialUsers).forEach(user => insertUser.run(user));

  // Student Profile
  const insertProfile = db.prepare(`
    INSERT INTO student_profiles (
      id, userId, name, avatar, email, rollNo, college, branch, academicYear,
      currentSemester, targetCareerRole, weeklyLearningHours, overallReadiness,
      previousReadiness, lastAssessmentDate, targetReadinessBenchmark, interests, currentSubjects
    ) VALUES (
      @id, @userId, @name, @avatar, @email, @rollNo, @college, @branch, @academicYear,
      @currentSemester, @targetCareerRole, @weeklyLearningHours, @overallReadiness,
      @previousReadiness, @lastAssessmentDate, @targetReadinessBenchmark, @interests, @currentSubjects
    )
  `);
  insertProfile.run(seeds.initialStudentProfile);

  // Skill Competencies
  const insertSkill = db.prepare(`
    INSERT INTO skill_competencies (
      id, studentId, name, category, currentProficiency, requiredProficiency, type,
      courseworkReinforced, reinforcedCourse, learningHoursToBridge
    ) VALUES (
      @id, @studentId, @name, @category, @currentProficiency, @requiredProficiency, @type,
      @courseworkReinforced, @reinforcedCourse, @learningHoursToBridge
    )
  `);
  seeds.initialSkillCompetencies.forEach(skill => insertSkill.run(skill));

  // Roadmap Weeks
  const insertRoadmap = db.prepare(`
    INSERT INTO roadmap_weeks (
      id, studentId, weekNumber, title, topic, estimatedHours, reinforcedByCoursework,
      status, completed, milestoneProject, readinessBoost, resources
    ) VALUES (
      @id, @studentId, @weekNumber, @title, @topic, @estimatedHours, @reinforcedByCoursework,
      @status, @completed, @milestoneProject, @readinessBoost, @resources
    )
  `);
  seeds.initialRoadmapWeeks.forEach(week => insertRoadmap.run(week));

  // Diagnostic Questions
  const insertDiag = db.prepare(`
    INSERT INTO diagnostic_questions (id, type, category, difficulty, question, codeSnippet, options, correctIndex, explanation)
    VALUES (@id, @type, @category, @difficulty, @question, @codeSnippet, @options, @correctIndex, @explanation)
  `);
  seeds.initialDiagnosticQuestions.forEach(q => insertDiag.run({ codeSnippet: null, ...q }));

  // Reassessment Questions
  const insertReassess = db.prepare(`
    INSERT INTO reassessment_questions (id, type, category, difficulty, question, codeSnippet, options, correctIndex, explanation)
    VALUES (@id, @type, @category, @difficulty, @question, @codeSnippet, @options, @correctIndex, @explanation)
  `);
  seeds.initialReassessmentQuestions.forEach(q => insertReassess.run({ codeSnippet: null, ...q }));

  // Soft Skills Analysis
  const insertSoft = db.prepare(`
    INSERT INTO soft_skills_analysis (
      id, studentId, recordedAt, durationSeconds, transcript, overallScore, metrics, strengths, improvements, aiActionableAdvice
    ) VALUES (
      @id, @studentId, @recordedAt, @durationSeconds, @transcript, @overallScore, @metrics, @strengths, @improvements, @aiActionableAdvice
    )
  `);
  insertSoft.run(seeds.initialSoftSkillsAnalysis);

  // Opportunities
  const insertOpp = db.prepare(`
    INSERT INTO opportunities (
      id, title, company, companyLogo, type, workMode, location, stipendOrSalary,
      duration, deadline, matchScore, requiredSkills, matchedSkills, missingSkills,
      courseworkSynergies, description, applicantsCount, openings, createdAt
    ) VALUES (
      @id, @title, @company, @companyLogo, @type, @workMode, @location, @stipendOrSalary,
      @duration, @deadline, @matchScore, @requiredSkills, @matchedSkills, @missingSkills,
      @courseworkSynergies, @description, @applicantsCount, @openings, @createdAt
    )
  `);
  seeds.initialOpportunities.forEach(opp => insertOpp.run(opp));

  // Applications
  const insertApp = db.prepare(`
    INSERT INTO applications (
      id, studentId, opportunityId, roleTitle, company, companyLogo, type, appliedDate, status, stageTimeline, interviewerNote, feedback
    ) VALUES (
      @id, @studentId, @opportunityId, @roleTitle, @company, @companyLogo, @type, @appliedDate, @status, @stageTimeline, @interviewerNote, @feedback
    )
  `);
  seeds.initialApplications.forEach(app => insertApp.run(app));

  // Candidates
  const insertCand = db.prepare(`
    INSERT INTO candidates (
      id, name, avatar, college, branch, academicYear, cgpa, overallReadiness, matchScore, targetRole, topSkills, status, appliedFor, appliedDate, resumeSummary
    ) VALUES (
      @id, @name, @avatar, @college, @branch, @academicYear, @cgpa, @overallReadiness, @matchScore, @targetRole, @topSkills, @status, @appliedFor, @appliedDate, @resumeSummary
    )
  `);
  seeds.initialRankedCandidates.forEach(cand => insertCand.run(cand));

  // Industry Postings
  const insertPosting = db.prepare(`
    INSERT INTO industry_postings (
      id, title, type, department, openings, stipend, location, status, applicantsCount, shortlistedCount, requiredSkills, postedDate
    ) VALUES (
      @id, @title, @type, @department, @openings, @stipend, @location, @status, @applicantsCount, @shortlistedCount, @requiredSkills, @postedDate
    )
  `);
  seeds.initialIndustryPostings.forEach(post => insertPosting.run(post));

  // College Students
  const insertStudent = db.prepare(`
    INSERT INTO college_students (id, rollNo, name, email, branch, academicYear, cgpa, readinessScore, tier, placementStatus)
    VALUES (@id, @rollNo, @name, @email, @branch, @academicYear, @cgpa, @readinessScore, @tier, @placementStatus)
  `);
  seeds.initialCollegeStudents.forEach(st => insertStudent.run(st));

  // Curriculum Gaps
  const insertGap = db.prepare(`
    INSERT INTO curriculum_gaps (id, domain, industryDemand, currentSyllabusCoverage, deficit, affectedBranch, recommendation)
    VALUES (@id, @domain, @industryDemand, @currentSyllabusCoverage, @deficit, @affectedBranch, @recommendation)
  `);
  seeds.initialCurriculumGaps.forEach(gap => insertGap.run(gap));

  // Faculty Opportunities
  const insertFacOpp = db.prepare(`
    INSERT INTO faculty_opportunities (
      id, title, type, sponsor, stipendOrGrant, duration, deadline, domain, description, deliverables, status
    ) VALUES (
      @id, @title, @type, @sponsor, @stipendOrGrant, @duration, @deadline, @domain, @description, @deliverables, @status
    )
  `);
  seeds.initialFacultyOpportunities.forEach(fo => insertFacOpp.run(fo));

  // Faculty Proposals
  const insertFacProp = db.prepare(`
    INSERT INTO faculty_proposals (
      id, title, type, industryPartner, submittedDate, status, department, summary, budgetEstimate
    ) VALUES (
      @id, @title, @type, @industryPartner, @submittedDate, @status, @department, @summary, @budgetEstimate
    )
  `);
  seeds.initialFacultyProposals.forEach(fp => insertFacProp.run(fp));

  // Notifications
  const insertNotif = db.prepare(`
    INSERT INTO notifications (id, role, title, description, time, icon, color, unread)
    VALUES (@id, @role, @title, @description, @time, @icon, @color, @unread)
  `);
  Object.entries(seeds.initialNotifications).forEach(([role, notifs]) => {
    notifs.forEach(n => insertNotif.run({ ...n, role }));
  });
}

// Auto-run schema initialization
initDb();

module.exports = {
  db,
  initDb
};
