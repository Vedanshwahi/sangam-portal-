const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/facultyController");

router.get("/overview", facultyController.getOverview);
router.get("/opportunities", facultyController.getOpportunities);
router.post("/opportunities/:id/apply", facultyController.applyOpportunity);
router.get("/proposals", facultyController.getProposals);
router.post("/proposals", facultyController.createProposal);

module.exports = router;
