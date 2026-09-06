const { db } = require("../config/database");

/**
 * Get institutional overview KPIs and readiness distributions
 */
function getOverview(req, res) {
  const { branch, academicYear } = req.query;

  let query = "SELECT * FROM college_students WHERE 1=1";
  const params = [];

  if (branch && branch !== "all") {
    query += " AND branch = ?";
    params.push(branch);
  }

  if (academicYear && academicYear !== "all") {
    query += " AND academicYear = ?";
    params.push(academicYear);
  }

  const students = db.prepare(query).all(...params);
  const total = students.length;

  if (total === 0) {
    return res.json({
      success: true,
      stats: {
        totalStudents: 0,
        averageReadiness: 0,
        jobReadyCount: 0,
        jobReadyPercent: 0,
        emergingCount: 0,
        emergingPercent: 0,
        needsSupportCount: 0,
        needsSupportPercent: 0,
        placedCount: 0,
        interviewCount: 0,
        availableCount: 0
      }
    });
  }

  const totalScore = students.reduce((sum, s) => sum + s.readinessScore, 0);
  const avgReadiness = Math.round(totalScore / total);

  const jobReady = students.filter(s => s.readinessScore >= 80);
  const emerging = students.filter(s => s.readinessScore >= 60 && s.readinessScore < 80);
  const needsSupport = students.filter(s => s.readinessScore < 60);

  const placed = students.filter(s => s.placementStatus === "Placed");
  const interview = students.filter(s => s.placementStatus === "In Interview");
  const available = students.filter(s => s.placementStatus === "Available");

  return res.json({
    success: true,
    stats: {
      totalStudents: total,
      averageReadiness: avgReadiness,
      jobReadyCount: jobReady.length,
      jobReadyPercent: Math.round((jobReady.length / total) * 100),
      emergingCount: emerging.length,
      emergingPercent: Math.round((emerging.length / total) * 100),
      needsSupportCount: needsSupport.length,
      needsSupportPercent: Math.round((needsSupport.length / total) * 100),
      placedCount: placed.length,
      interviewCount: interview.length,
      availableCount: available.length
    }
  });
}

/**
 * Get student directory with filtering
 */
function getStudents(req, res) {
  const { branch, academicYear, status, search } = req.query;

  let query = "SELECT * FROM college_students WHERE 1=1";
  const params = [];

  if (branch && branch !== "all") {
    query += " AND branch = ?";
    params.push(branch);
  }

  if (academicYear && academicYear !== "all") {
    query += " AND academicYear = ?";
    params.push(academicYear);
  }

  if (status && status !== "all") {
    query += " AND placementStatus = ?";
    params.push(status);
  }

  if (search) {
    const s = `%${search.toLowerCase()}%`;
    query += " AND (LOWER(name) LIKE ? OR LOWER(rollNo) LIKE ? OR LOWER(email) LIKE ?)";
    params.push(s, s, s);
  }

  query += " ORDER BY readinessScore DESC, cgpa DESC";

  const students = db.prepare(query).all(...params);

  return res.json({
    success: true,
    count: students.length,
    students
  });
}

/**
 * Batch import students from parsed CSV
 */
function importStudents(req, res) {
  const { students } = req.body;

  if (!Array.isArray(students) || students.length === 0) {
    return res.status(400).json({ success: false, message: "A valid array of student records is required" });
  }

  const insertStudent = db.prepare(`
    INSERT INTO college_students (id, rollNo, name, email, branch, academicYear, cgpa, readinessScore, tier, placementStatus)
    VALUES (@id, @rollNo, @name, @email, @branch, @academicYear, @cgpa, @readinessScore, @tier, @placementStatus)
    ON CONFLICT(rollNo) DO UPDATE SET
      name = excluded.name,
      email = excluded.email,
      branch = excluded.branch,
      academicYear = excluded.academicYear,
      cgpa = excluded.cgpa,
      readinessScore = excluded.readinessScore,
      tier = excluded.tier,
      placementStatus = excluded.placementStatus
  `);

  const inserted = [];
  const runTransaction = db.transaction((records) => {
    records.forEach((record, index) => {
      const score = Number(record.readinessScore) || 70;
      let tier = "Emerging (60-80%)";
      if (score >= 80) tier = "Job-Ready (>80%)";
      else if (score < 60) tier = "Needs Support (<60%)";

      const studentData = {
        id: record.id || `imported-${Date.now()}-${index}`,
        rollNo: record.rollNo || `IMP${Date.now()}${index}`,
        name: record.name,
        email: record.email || `${(record.name || "student").toLowerCase().replace(/\s+/g, ".")}@apex.edu.in`,
        branch: record.branch || "CSE",
        academicYear: record.academicYear || "3rd Year",
        cgpa: Number(record.cgpa) || 8.0,
        readinessScore: score,
        tier,
        placementStatus: record.placementStatus || "Available"
      };

      insertStudent.run(studentData);
      inserted.push(studentData);
    });
  });

  try {
    runTransaction(students);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Database transaction failed: " + err.message });
  }

  const allStudents = db.prepare("SELECT * FROM college_students ORDER BY readinessScore DESC").all();

  return res.status(201).json({
    success: true,
    message: `Successfully imported ${inserted.length} students into the institutional directory`,
    importedCount: inserted.length,
    totalStudents: allStudents.length,
    students: allStudents
  });
}

/**
 * Get curriculum vs industry demand gaps
 */
function getCurriculumGaps(req, res) {
  const gaps = db.prepare("SELECT * FROM curriculum_gaps ORDER BY deficit DESC").all();

  return res.json({
    success: true,
    gaps
  });
}

/**
 * Download sample CSV template
 */
function getSampleCsv(req, res) {
  const csvContent = `RollNo,Name,Email,Branch,AcademicYear,CGPA,ReadinessScore,PlacementStatus
22CS201,Kavya Nair,kavya.n@apex.edu.in,CSE,3rd Year,8.85,78,Available
22CS202,Aditya Verma,aditya.v@apex.edu.in,CSE,4th Year,9.10,86,In Interview
22IT105,Priyanka Sharma,priyanka.s@apex.edu.in,IT,3rd Year,8.20,74,Available
22AI088,Varun Mehta,varun.m@apex.edu.in,AI & Data Science,4th Year,8.95,84,Placed
22EC064,Divya Rao,divya.r@apex.edu.in,ECE,3rd Year,7.90,62,Available`;

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="sangam_students_template.csv"');
  return res.send(csvContent);
}

module.exports = {
  getOverview,
  getStudents,
  importStudents,
  getCurriculumGaps,
  getSampleCsv
};
