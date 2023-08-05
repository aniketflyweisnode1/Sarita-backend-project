const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(
      `#### user with < ${user.firstName} ${user.lastName} >  deleted ####`
    );
    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "server error while deleting user",
      error: err.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const userId = req.query.userId;
    const queryObj = {};
    if (req.query.userId) {
      queryObj.userId = userId;
    }

    const users = await User.find(queryObj);
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "server error while getting users",
      error: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = req.userInParams;

    user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
    user.lastName = req.body.lastName ? req.body.lastName : user.lastName;

    user.email = req.body.email ? req.body.email : user.email;
    user.DOB = req.body.dateOfBirth ? req.body.dateOfBirth : user.DOB;
    user.phone = req.body.phone ? req.body.phone : user.phone;
    user.country = req.body.phone ? req.body.country : user.country;

    const updatedUser = await user.save();

    console.log(
      `#### ${updatedUser.firstName} ${updatedUser.userId} data updated ####`
    );
    res.status(200).send({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.log("#### Error while updating user data #### ", err.message);
    res.status(500).send({
      message: "Internal server error while updating user data",
    });
  }
};

exports.findById = async (req, res) => {
  try {
    const user = req.params.id;
    const users = await User.findById(user);
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send({
      data: users,
    });
  } catch (err) {
    console.log("#### Error while searching for the user #### ", err.message);
    res.status(500).send({
      message: "Internal server error while fetching data",
    });
  }
};
exports.findByUserId = async (req, res) => {
  try {
    const user = req.params.userId;
    const users = await User.findOne({ userId: user });
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send({
      data: users,
    });
  } catch (err) {
    console.log("#### Error while searching for the user #### ", err.message);
    res.status(500).send({
      message: "Internal server error while fetching data",
    });
  }
};
