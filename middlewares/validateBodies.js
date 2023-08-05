const technicalSupportBodies = async (req, res, next) => {
  if (!req.body.gmailAddress) {
    return res.status(400).json({
      status: "error",
      message: "Please enter a valid gmail address",
    });
  }
  if (!req.body.phoneNumber) {
    return res.status(400).json({
      status: "error",
      message: "Please enter a valid phone number",
    });
  }
  if (!req.body.timing) {
    return res.status(400).json({
      status: "error",
      message: "Please enter a valid timing",
    });
  }
  if (!req.body.days) {
    return res.status(400).json({
      status: "error",
      message: "Please enter a valid days",
    });
  }
  if (!req.body.message) {
    return res.status(400).json({
      status: "error",
      message: "Please enter a query message",
    });
  }
  next();
};

const chargesBodies = async (req, res, next) => {
  if (!req.body.pricePerUnitDistance) {
    return res.status(400).json({
      status: "error",
      message: "Please enter price per km",
    });
  }
  if (!req.body.pricePerUnitWeight) {
    return res.status(400).json({
      status: "error",
      message: "Please enter charge per Kg",
    });
  }
  if (!req.body.pricePerVolumeUnits) {
    return res.status(400).json({
      status: "error",
      message: "Please enter charge per VolumeUnits",
    });
  }
  // if (!req.body.fuelSurcharge) {
  //   return res.status(400).json({
  //     status: "error",
  //     message: "Please enter surcharge",
  //   });
  // }

  next();
};

module.exports = {
  technicalSupportBodies,
  chargesBodies,
};
