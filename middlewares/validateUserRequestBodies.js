require("dotenv").config();
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
//const constants = require('../utils/constants')

const isValidEmail = (email) => {
  // checks valid email format
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isValidPassword = (password) => {
  // checks password meets requirements
  return password.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/
  );
};

const signUpBody = async (req, res, next) => {
  try {
    if (!req.body.firstName) {
      return res.status(400).send({
        message: "Failed! firstName is not provided",
      });
    }
    if (!req.body.lastName) {
      return res.status(400).send({
        message: "Failed! LastName is not provided",
      });
    }
    if (!req.body.email) {
      return res.status(400).send({
        message: "Failed! Email is not provided",
      });
    }

    if (!isValidEmail(req.body.email)) {
      return res.status(400).send({
        message: "Failed! Not a valid email id",
      });
    }

    // if (!req.body.userId){
    //     return res.status(400).send({
    //         message : "Failed! UserId is not provided"
    //     });
    // }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).send({
        message: "Failed! EmailId is already taken",
      });
    }

    if (!req.body.dateOfBirth) {
      return res.status(400).send({
        message: "Failed! Date of Birth is not provided",
      });
    }
    if (!req.body.country) {
      return res.status(400).send({
        message: "Failed! Country is not provided",
      });
    }

    next();
  } catch {
    console.log(
      "#### Error while validating sign-up request body ##### ",
      err.message
    );
    res.status(500).send({
      message: "Internal server error while sign-up validation",
    });
  }
};

const signInBody = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "Failed ! email is not provided",
    });
  }
  if (!isValidEmail(req.body.email)) {
    return res.status(400).send({
      message: "Failed! Not a valid email id",
    });
  }
  const admin = await Admin.findOne({ email: req.body.email });
  if (admin) {
    return res.status(400).send({ msg: "email already exists" });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "Failed ! Password is not provided",
    });
  }

  next();
};

const adminSignInBody = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "Failed ! emailId is not provided",
    });
  }
  if (!isValidEmail(req.body.email)) {
    return res.status(400).send({
      message: "Failed! Not a valid email id",
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "Failed ! Password is not provided",
    });
  }

  next();
};
const adminSignUpBody = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "Failed ! EmailId is not provided",
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "Failed ! Password is not provided",
    });
  }

  next();
};

const UserUpdateBody = (req, res, next) => {
  //   if (req.body.password && !isValidPassword(req.body.password)) {
  //     return res.status(400).send({
  //       message:
  //         "Failed! Not a valid password. Password must be 10 to 25 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
  //     });
  //   }

  if (req.body.email && !isValidEmail(req.body.email)) {
    return res.status(400).send({
      message: "Failed! Not a valid email id",
    });
  }

  next();
};

const validateUserRequestBodies = {
  signUpBody,
  signInBody,
  UserUpdateBody,
  adminSignUpBody,
  adminSignInBody,
};

module.exports = validateUserRequestBodies;
