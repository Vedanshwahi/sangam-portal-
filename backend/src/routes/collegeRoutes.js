const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");

router.get("/overview", collegeController.getOverview);
router.get("/students", collegeController.getStudents);
router.post("/students/import", collegeController.importStudents);
router.get("/curriculum-gaps", collegeController.getCurriculumGaps);
router.get("/sample-csv", collegeController.getSampleCsv);

module.exports = router;
