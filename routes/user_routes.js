const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user_controller')


router.post("/", UserController.register);

router.post("/login", UserController.user_login);

router.get("/confirm-mail/:id", UserController.confirm_email);

router.post("/forgot-password", UserController.forgot_password);

router.post("/forgot-password/:id", UserController.reset_password);




module.exports = router;