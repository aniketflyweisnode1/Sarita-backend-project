const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
var compression = require("compression");
const app = express();

app.use(compression({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
require("./routes/login.route")(app);

require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/admin.route")(app);

//packages
require("./routes/package.route")(app);
require("./routes/address.route")(app);
// require("./routes/shipping.routes")(app);
require("./routes/items.route")(app);
require("./routes/legal.routes")(app);
require("./routes/privacy.route")(app);
require("./routes/dispute.routes")(app);
require("./routes/generalSupport.route")(app);
require("./routes/technicalSupport")(app);
require("./routes/fraudAwareness.route")(app);
require("./routes/country.route")(app);
require("./routes/discount.route")(app);
require("./routes/order.route")(app);
require("./routes/document.route")(app);
require("./routes/legaNotice.route")(app);
require("./routes/endUser.route")(app);
require("./routes/state.route")(app);
require("./routes/city.route")(app);
require("./routes/pincodes.route")(app);
require("./routes/charge.route")(app);
require("./routes/cost.route")(app);
require("./routes/cost.route")(app);
require("./routes/package.route")(app);
require("./routes/assignMen.route")(app);
require("./routes/dimension.route")(app);
require("./routes/pickupSchedule.route")(app);
require("./routes/booking.route")(app);
require("./routes/payment.route")(app);
require("./routes/terms.route")(app);
require("./routes/privacy.route")(app);
app.use("/api/v1/", require("./routes/banner.route"));
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
// Connect MongoDB at default port 27017.
mongoose.connect(process.env.DB_URL, (err) => {
  if (!err) {
    console.log("MongoDB Connection Succeeded.");
  } else {
    console.log("Error in DB connection: " + err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
