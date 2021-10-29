const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String, required: true},
    email:{type:String, required: true},
    password:{type:String, required: true},
    active:{type:Boolean, required: false, default: false},
    date:{type:Date, required: false, default: Date.now},
});

module.exports = mongoose.model('User',userSchema);