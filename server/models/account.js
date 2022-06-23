const mongoose = require("mongoose");
const Account = mongoose.model("Account", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  money: {
    type: Number,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});
module.exports = Account;
