const mongoose = require('mongoose')


const noteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{type:String, required: true},
    description:{type:String, required: true},
    visibility:{type:Boolean, required: false, default: "public"},
    date:{type:Date, required: false, default: Date.now},
});

module.exports = mongoose.model('Note',noteSchema);