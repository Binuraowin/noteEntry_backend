const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user_model');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
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

    //check user name existence
    const checkUserName = await User.find({
        name: req.body.name,
    }).exec()


    if (checkUserName.length > 0) {
        console.log(checkUserName)
        res.status(409).send("User Name is exist")
    } else {
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

                    //sending email
                    var transporter = nodemailer.createTransport(smtpTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        auth: {
                            user: 'blabsbinura@gmail.com',
                            pass: '80216620Bi'
                        }
                    }));

                    var mailOptions = {
                        from: 'blabsbinura@gmail.com',
                        to: req.body.email,
                        subject: 'Conrfirm Email - no @reply',
                        text: `Hi ${req.body.name},
                        click this link to confirm the email https://notes-app-my.herokuapp.com/user/confirm-mail/${result._id}
                        `
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.status(201)
                    res.send(result)
                })
        } catch (error) {
            res.status(400).send(error)
        }
    }

}

exports.user_login = async (req, res, next) => {
    //validation user login
    const {
        error
    } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //find userby email
    User.find({
            name: req.body.name,
        }).exec()
        .then(async findResult => {
            console.log(findResult)
            if (findResult.length == 0) {
                console.log(findResult)
                res.status(409).send("User name not exist")
            } else {
                if (findResult[0].active) {

                    const checkPassword = await bcrypt.compare(req.body.password, findResult[0].password)
                    if (checkPassword) {
                        const token = jwt.sign({
                            _id: findResult[0]._id
                        }, "gkuybbghashafafgyb")
                        res.header('auth-token', token).send(token)
                    } else {
                        res.status(403).send("username or passsword error")
                    }
                } else {
                    res.status(403).send("Email not verified")
                }


            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err)
        });
}


exports.confirm_email = async (req, res, next) => {
    console.log(req.params)

    //find userby id
    User.findByIdAndUpdate(req.params.id, {
            "active": true
        }, {
            useFindAndModify: false
        }).exec()
        .then(async findResult => {
            res.status(200).send(findResult)
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err)
        });
}

exports.forgot_password = async (req, res, next) => {
    console.log(req.body)

    //find userby email
    User.find({
        email: req.body.email,
    }).exec()
        .then(async findResult => {
            //sending email
            var transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: 'blabsbinura@gmail.com',
                    pass: '80216620Bi'
                }
            }));

            var mailOptions = {
                from: 'blabsbinura@gmail.com',
                to: findResult[0].email,
                subject: 'Conrfirm Email - no @reply',
                text: `Hi ${findResult[0].name},
                To reset password use this link  https://notes-app-my.herokuapp.com/user/forgot-password/${findResult[0]._id}
                `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.status(200).send("password sent to mail")
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err)
        });
}

exports.reset_password = async (req, res, next) => {
    console.log(req.body)

       //encrypt the password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //find userby email
    User.findByIdAndUpdate(req.params.id, {
        "password": hashedPassword
    }, {
        useFindAndModify: false
    }).exec()
        .then(async findResult => {
            res.status(200).send(findResult)
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err)
        });
}