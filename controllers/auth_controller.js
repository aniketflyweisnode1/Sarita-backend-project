const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const LoginModel = require("../models/login.model");
//const constants = require('../utils/constants');
//const objectConverter = require('../utils/objectConverter')
const ObjectId = require("mongoose").Types.ObjectId;

exports.signUp = async (req, res) => {
  try {
    const userIdReq = await LoginModel.findById(req.user._id);

    const userObj = {
      userId: req.user._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      phone: parseInt(userIdReq.phone),
      DOB: req.body.dateOfBirth,
      country: req.body.country,
    };

    const userCreated = await User.create(userObj);

    console.log(
      `#### ${userCreated.firstName} ${userCreated.lastName} created ####`
    );
    console.log(userCreated);
    res.status(201).send({
      message: "signed up successfully",
      data: userCreated,
    });
  } catch (err) {
    console.log("#### error while user sign up #### ", err.message);
    res.status(500).send({
      message: "Internal server error while creating user",
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
