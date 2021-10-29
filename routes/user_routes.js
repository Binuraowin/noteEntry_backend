const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user_controller')


router.post("/", UserController.register);

router.post("/login", UserController.user_login);



module.exports = router;