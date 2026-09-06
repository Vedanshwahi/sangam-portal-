const express = require("express");
const router = express.Router();
const opportunityController = require("../controllers/opportunityController");

router.get("/", opportunityController.getOpportunities);
router.get("/:id", opportunityController.getOpportunityById);
router.get("/user/applications", opportunityController.getApplications);
router.post("/apply", opportunityController.applyToOpportunity);

module.exports = router;
