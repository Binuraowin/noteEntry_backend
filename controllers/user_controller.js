const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user_model');
const {
    registerValidation,
    loginValidation
} = require('../validator')

exports.register = async (req, res, next) => {
    //validate user name and email
    const {
        error
    } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //check email existence
    const checkEmail = await User.find({
        email: req.body.email,
    }).exec()


    if (checkEmail.length >0 ) {
        console.log(checkEmail)
        res.status(409).send("Email is exist")
    } else {
        console.log(checkEmail)
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        try {
            console.log(req.body)
            const savedUser = await user.save()
                .then(result => {
                    res.status(201)
                    res.send(result)
                })
        } catch (error) {
            res.status(400).send(error)
        }
    }

}

