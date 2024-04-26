const express = require("express");
const router = express.Router();
const authController = require("../controllers/user");

/* 

johndoe3@example.com
Password123!
*/
router.post("/create", authController.createUser);
router.get("/get", authController.getUser);

module.exports = router;
