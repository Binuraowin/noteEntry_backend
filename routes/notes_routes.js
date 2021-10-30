const express = require("express");
const router = express.Router();

const NotesController = require('../controllers/note_controller')


router.post("/", NotesController.test);




module.exports = router;