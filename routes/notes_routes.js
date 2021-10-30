const express = require("express");
const router = express.Router();

const NotesController = require('../controllers/note_controller')

const verify = require('../verifyToken')


router.post("/", verify,NotesController.note_create);

router.put("/:id",verify, NotesController.note_update);

router.delete("/:id",verify, NotesController.note_delete);




module.exports = router;