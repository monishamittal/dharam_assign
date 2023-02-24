const express = require('express');
const router = express.Router();

const middleware = require("../middleware/loggedIn")
const userController = require("../controller/userController")
const campaignController = require("../controller/campaignController")

//-------------------user apis----------------
router.post("/api/create", userController.createUser)
router.post("/api/login", userController.loginUser)
router.get("/api/logout", userController.logoutUser)
router.get("/api/admin", middleware.loggedIn, userController.adminUser)

//------------------campaign apis---------------------
router.post("/api/campaign", campaignController.createCampaign)
router.get("/api/redirect", campaignController.redirectCampaign)
router.get("/api/admin/campaigns/:id/toggle", middleware.loggedIn, campaignController.toggleCampaign)


module.exports = router;