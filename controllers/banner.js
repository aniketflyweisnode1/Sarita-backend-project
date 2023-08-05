const offer = require("../models/banner.model");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./Images");
//   },
//   filename: function (req, file, cb) {
//     const name = file.originalname + "Offer";
//     cb(null, name);
//   },
// });

//exports.uploadImg = multer({ storage: storage }).single("image");

exports.addoffer = async (req, res) => {
  try {
    const data = {
      image: req.body.image,
    };
    console.log(data);

    const Image = await offer.create(data);
    console.log(Image);
    res.status(200).json({
      message: " Offer Added ",
      details: Image,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.deleteOffers = async (req, res) => {
  try {
    const id = req.params.id;
    await offer.deleteOne({ _id: id });
    res.status(200).send({ message: "Offers Image  deleted " });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

exports.getOffers = async (req, res) => {
  try {
    const getOffer = await offer.find();
    if (getOffer.length === 0)
      return res.status(404).send({ message: "not found" });
    res.status(200).json({
      offer: getOffer,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

exports.getOffersById = async (req, res) => {
  try {
    const getOffer = await offer.findById(req.params.id);
    if (!getOffer || getOffer.length === 0)
      return res.status(404).send({ message: "not found" });
    res.status(200).json({
      offer: getOffer,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
