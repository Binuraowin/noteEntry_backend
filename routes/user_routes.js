const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user_controller')


router.post("/", UserController.register);

router.post("/login", UserController.user_login);

router.get("/confirm/:id", UserController.confirm_email);

router.post("/forgot", UserController.forgot_password);

router.post("/forgot/:id", UserController.reset_password);




module.exports = router;