const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const ObjectId = require("mongoose").Types.ObjectId;
const Admin = require("../models/admin.model");

exports.signUp = async (req, res) => {
  try {
    const adminObj = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    };

    const adminCreated = await Admin.create(adminObj);

    console.log(`#### ${adminCreated.email} ${adminCreated._id} created ####`);

    res.status(201).send({
      message: "signed up successfully",
      data: adminCreated,
    });
  } catch (err) {
    console.log("#### error while Admin sign up #### ", err.message);
    res.status(500).send({
      message: "Internal server error while creating Admin",
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send({
        message: "email is required",
      });
    }
    if (!req.body.password) {
      return res.status(400).send({
        message: "password is required",
      });
    }
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(400).send({
        message: " Email Id doesn't exist",
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      admin.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Wrong password",
      });
    }

    const accessToken = jwt.sign({ admin: admin.email }, authConfig.secret, {
      expiresIn: authConfig.accessTokenTime,
    });
    const refreshToken = jwt.sign({ admin: admin.email }, authConfig.secret, {
      expiresIn: authConfig.refreshTokenTime,
    });
    console.log(`#### ${admin.email} ${admin._id} logged in ####`);

    res.status(200).send({
      name: admin.name,
      adminId: admin.adminId,
      email: admin.email,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.log("#### Error while Admin signing in ##### ", err.message);
    res.status(500).send({
      message: "Internal server error while Admin signing in",
    });
  }
};

exports.refreshAccessToken = (req, res) => {
  const accessToken = jwt.sign({ id: req.Admin.AdminId }, authConfig.secret, {
    expiresIn: authConfig.accessTokenTime,
  });
  res.status(200).send({
    accessToken: accessToken,
  });
};

exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    console.log(
      `#### admin with < ${admin.firstName} ${admin.lastName} >  deleted ####`
    );
    return res.status(200).json({ message: "Admin deleted" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "server error while deleting admin",
      error: err.message,
    });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    if (admins.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json(admins);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "server error while getting admins",
      error: err.message,
    });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.password = req.body.password
      ? bcrypt.hashSync(req.body.password, 8)
      : admin.password;
    admin.email = req.body.email ? req.body.email : admin.email;

    const updatedAdmin = await admin.save();

    console.log(
      `#### ${updatedAdmin.email}  data updated ####` + "\n" + updatedAdmin
    );
    res.status(200).send({
      message: "Admin updated successfully",
      data: updatedAdmin,
    });
  } catch (err) {
    console.log("#### Error while updating admin data #### ", err.message);
    res.status(500).send({
      message: "Internal server error while updating admin data",
    });
  }
};

exports.findByAdminId = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json(admin);
  } catch (err) {
    console.log("#### Error while searching for the admin #### ", err.message);
    res.status(500).send({
      message: "Internal server error while fetching data",
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: "email is required" });
    }
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      console.log("#### admin not found with emailId", req.body.email);
      return res.status(404).json({ message: "Admin not found" });
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      admin._id,
      { password: bcrypt.hashSync(req.body.password, 8) },
      { new: true }
    );
    console.log("#### updated admin #### " + "\n" + updatedAdmin);
    res
      .status(200)
      .json({ msg: "admin udpdated successfully", data: updatedAdmin });
  } catch (err) {
    console.log("#### Error while updating admin #### ", err.message);
    res.status(500).send({
      msg: "Internal server error while updating admin ",
      error: err.message,
    });
  }
};
