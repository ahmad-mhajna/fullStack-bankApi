const Account = require("../models/account");

async function getusers(req, res) {
  try {
    const users = await Account.find({});
    if (users.length <= 0) {
    }
    res.send(users);
  } catch (error) {}
}
