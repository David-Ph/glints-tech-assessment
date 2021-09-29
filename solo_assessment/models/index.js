require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const mongoose = require("mongoose");
const uri = mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

exports.Item = require("./item");
