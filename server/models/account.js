const mongoose = require("mongoose");
const Account = mongoose.model("Account", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  money: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
module.exports = Account;
