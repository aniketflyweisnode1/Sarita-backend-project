const { default: mongoose } = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
require("dotenv").config();

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.DB_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("DAtabase error");
  }
};
module.exports = dbConnect;
