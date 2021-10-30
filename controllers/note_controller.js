const mongoose = require("mongoose");
const Note = require('../model/notes_model');

exports.test = async (req, res, next) => {
    console.log("works fine")
}