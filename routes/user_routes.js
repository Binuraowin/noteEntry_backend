const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user_controller')


router.get("/", UserController.test);



module.exports = router;