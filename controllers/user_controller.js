const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


  exports.test = async (req, res, next) => {
    res.send("works!")
  }