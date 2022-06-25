require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
try {
  mongoose.connect(url, { useNewUrlParser: true }, (client, err) => {
    if (client) console.log("mongoose connected");
  });
} catch (error) {
  console.log("mongoose failed");
}
