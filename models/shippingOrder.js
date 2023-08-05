// const mongoose = require("mongoose");
// const shippingOrderSchema = new mongoose.Schema(
//     {
//         // shippingCategory: {
//         //   type: String,
//         //   //required: true,
//         //   enum: ["Document", "Package"],
//         // },
//         // shippingFrom: {
//         //   type: mongoose.SchemaTypes.ObjectId,
//         //   ref: "Address",
//         // },
//         // shippingTo: {
//         //   type: mongoose.SchemaTypes.ObjectId,
//         //   ref: "Address",
//         // },
//         userId: {
//             type: mongoose.SchemaTypes.ObjectId,
//             ref: "User",
//             required: true,
//         },
//         shippingFrom: {
//             country: {
//                 type: String,
//                 required: true,
//             },
//             pinCode: {
//                 type: Number,
//                 required: true,
//             },
//             state: {
//                 type: String,
//                 required: true,
//             },
//             city: {
//                 type: String,
//                 required: true,
//             },
//         },
//         shippingTo: {
//             country: {
//                 type: String,
//                 required: true,
//             },
//             pinCode: {
//                 type: Number,
//                 required: true,
//             },
//             state: {
//                 type: String,
//                 required: true,
//             },
//             city: {
//                 type: String,
//                 required: true,
//             },
//         },
//         toMe: {
//             type: mongoose.SchemaTypes.ObjectId,
//             ref: "User",
//         },

//         packages: [
//             {
//                 packageCategory: {
//                     type: String,

//                     enum: ["Package", "Document"],
//                 },
//                 length: {
//                     type: Number,
//                     // required:true
//                 },
//                 unitLength: {
//                     type: String,
//                     enum: ["cm", "inches"],
//                     default: "cm",
//                 },
//                 width: {
//                     type: Number,
//                     // required:true
//                 },
//                 unitWidth: {
//                     type: String,
//                     enum: ["cm", "inches"],
//                     default: "cm",
//                 },

//                 height: {
//                     type: Number,
//                     // required:true
//                 },
//                 unitHeight: {
//                     type: String,
//                     enum: ["cm", "inches"],
//                     default: "cm",
//                 },

//                 quantity: {
//                     type: Number,
//                     // required:true
//                 },
//                 weight: {
//                     type: Number,
//                     // required:true
//                 },
//                 unitWeight: {
//                     type: String,
//                     enum: ["pounds", "lbs"],
//                     default: "lbs",
//                 },
//             },
//         ],
//         shipmentValue: {
//             type: Number,
//             // required:true
//         },
//         currency: {
//             type: String,
//             // required:true
//         },
//         // amount: {
//         //   type: Number,
//         // },
//         pickupMan: {
//             type: String,
//             default: "not assigned",
//         },
//         parcelStatus: {
//             type: String,
//             default: "Pending",
//             enum: ["Approved", "Pending"],
//         },
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("ShippingOrder", shippingOrderSchema);
