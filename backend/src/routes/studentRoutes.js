const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/profile", studentController.getProfile);
router.put("/profile", studentController.updateProfile);
router.get("/skills", studentController.getSkills);
router.get("/roadmap", studentController.getRoadmap);
router.post("/roadmap/:weekId/toggle", studentController.toggleRoadmapMilestone);
router.get("/diagnostics", studentController.getDiagnostics);
router.post("/diagnostics/submit", studentController.submitDiagnostics);
router.get("/reassessment", studentController.getReassessment);
router.post("/reassessment/complete", studentController.completeReassessment);
router.get("/soft-skills", studentController.getSoftSkills);
router.post("/soft-skills/analyze", studentController.analyzeSoftSkills);
router.get("/portfolio/:rollNo", studentController.getPortfolio);

module.exports = router;
