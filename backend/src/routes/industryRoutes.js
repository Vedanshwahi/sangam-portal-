const express = require("express");
const router = express.Router();
const industryController = require("../controllers/industryController");

router.get("/candidates", industryController.getCandidates);
router.patch("/candidates/:id/status", industryController.updateCandidateStatus);
router.get("/postings", industryController.getPostings);
router.post("/postings", industryController.createPosting);

module.exports = router;
