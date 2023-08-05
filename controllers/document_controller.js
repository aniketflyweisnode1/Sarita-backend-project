const Document = require("../models/document.model");



exports.createDocument = async (req, res) => {
  try {
    const documentObj = {
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      weight: req.body.weight,
      quantity: req.body.quantity,
      shipmentValue: req.body.shipmentValue,
      currency: req.body.currency,
    };
    // const {length,weight,width,height,quantity,shipmentValue,currency} = req.body;

    const newDocument = await Document.create(documentObj);
    console.log(` ## new document details created ${newDocument} ##`);
    res.status(201).json({
      message: "new document details created ",
      data: newDocument,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    if (documents.length == 0) {
      return res.status(403).json({
        message: "no documents found",
      });
    }
    res.status(201).json({
      message: "documents found",
      data: documents,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};
exports.getDocumentsById = async (req, res) => {
  try {
    const documents = await Document.findById(req.params.id);
    if (!documents || documents.length == 0) {
      return res.status(403).json({
        message: "no documents found",
      });
    }
    console.log(documents);

    return res.status(200).json({
      data: documents,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const documentObj = {
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      weight: req.body.weight,
      quantity: req.body.quantity,
      shipmentValue: req.body.shipmentValue,
      currency: req.body.currency,
    };
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      documentObj
    ).exec();
    console.log(` ## updated document details ${updatedDocument} ##`);
    res.status(200).json({
      message: "updated document details ",
      data: updatedDocument,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndRemove(req.params.id);
    console.log(` ## deleted document details ${deletedDocument} ##`);
    res.status(200).json({
      message: "deleted document details ",
      data: deletedDocument,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      message: "internal server error",
    });
  }
};
