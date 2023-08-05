const LoginModel = require("../models/login.model");
const newOTP = require("otp-generators");
//const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");

exports.login = async (req, res) => {
  try {
    const userexists = await LoginModel.findOne({ phone: req.body.phone });
    //console.log( userexits);

    if (userexists) {
      //console.log(userexists,"123");

      const otpGen = newOTP.generate(4, {
        alphabets: false,
        upperCase: false,
        specialChar: false,
      });
      userexists.OTP = otpGen;
      const updatedUser = await userexists.save();

      console.log(updatedUser);

      await userexists.save();
      return res.status(200).json({
        userId: userexists._id,
        data: otpGen,
        message: "OTP Generated Successfully",
      });
    } else {
      const otpGen = newOTP.generate(4, {
        alphabets: false,
        upperCase: false,
        specialChar: false,
      });

      const data = {
        phone: req.body.phone,
        OTP: otpGen,
      };

      const otpToSend = await LoginModel.create(data);
      return res.status(200).json({
        userId: otpToSend._id,
        data: otpToSend.OTP,
        message: "OTP Generated Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    // const { phone,OTP } = req.body;
    // console.log({ phone,OTP });

    if (!req.body.OTP) {
      return res.status(401).json({ message: "OTP is required" });
    }
    //const users= await LoginModel.find();

    const user = await LoginModel.findOne({ _id: req.params.id });

    console.log(user);
    if (!user) {
      return res.status(401).json({
        message: "Invalid phone Number",
      });
    }
    console.log(user);

    if (user.OTP != req.body.OTP) {
      return res.status(403).json({ message: "Invalid OTP" });
    }
    const accessToken = jwt.sign({ id: user.phone }, authConfig.secret, {
      expiresIn: "24h",
    });
    const refreshToken = jwt.sign({ id: user.phone }, authConfig.secret, {
      expiresIn: "24h",
    });
    console.log(`#### user with phone number ${user.phone}  logged in ####`);

    return res.status(200).json({
      message: "user logged in",

      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error" });
  }
};
