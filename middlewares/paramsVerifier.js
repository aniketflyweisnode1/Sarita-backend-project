const User = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

const userInParams = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "  invalid id ",
      });
    }
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(400).send({
        message: "userId passed doesn't exist",
      });
    }
    req.userInParams = user;
    next();
  } catch (err) {
    console.log("#### Error while reading the user info #### ", err.message);
    return res.status(500).send({
      message: "Internal server error while reading the user data",
    });
  }
};

module.exports = {
  userInParams: userInParams,
};
