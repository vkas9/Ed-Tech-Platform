const mongoose = require("mongoose");
require("dotenv").config();
exports.dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Successfully Connected to DB");
    })
    .catch((error) => {
      console.log("Unable to connect to the database. Please try again later.");
      console.log(error);
      process.exit(1);
    });
};
