const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const LoginModel = require("../models/login.model");
//const constants = require('../utils/constants');
//const objectConverter = require('../utils/objectConverter')
const ObjectId = require("mongoose").Types.ObjectId;

exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password, phone, DOB, country } = req.body;

  const userObj = {
    firstName,
    lastName,
    email,
    password: bcrypt.hash(password, 8),
    phone,
    DOB,
    country,
  };

  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      const newUser = await User.create(userObj);
      res.json({
        message: "signed up successfully",
        data: newUser,
      });
    } else {
      throw new Error("User Already Exists");
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error while creating user",
      error: err.message,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({
        message: "Failed! userId passed doesn't exist",
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Wrong password",
      });
    }

    const accessToken = jwt.sign({ id: user.email }, authConfig.secret, {
      expiresIn: authConfig.accessTokenTime,
    });
    const refreshToken = jwt.sign({ id: user.email }, authConfig.secret, {
      expiresIn: authConfig.refreshTokenTime,
    });
    console.log(`#### ${user.userType} ${user.name} logged in ####`);

    res.status(200).send({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.log("#### Error while user signing in ##### ", err.message);
    res.status(500).send({
      message: "Internal server error while user signing in",
    });
  }
};

exports.refreshAccessToken = (req, res) => {
  const accessToken = jwt.sign({ id: req.user.userId }, authConfig.secret, {
    expiresIn: authConfig.accessTokenTime,
  });
  res.status(200).send({
    accessToken: accessToken,
  });
};
