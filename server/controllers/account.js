const Account = require("../models/account");
const { changeMoney } = require("./utilities");
async function getUsers(req, res) {
  try {
    const users = await Account.find({});
    if (users.length <= 0) {
      return res.status(404).send("not found");
    }
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function addAccount(req, res) {
  try {
    const user = await new Account(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateUser(req, res) {
  try {
    const users = await changeMoney(req.body, req.params);
    await Promise.all(users.map((user) => user.save()));
    res.send(users);
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
}
module.exports = {
  getUsers,
  updateUser,
  addAccount,
};
