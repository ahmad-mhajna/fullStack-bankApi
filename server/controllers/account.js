const Account = require("../models/account");

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
  const updates = Object.keys(req.body);

  const allowedUpdates = ["credit", "money", "name"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = await Account.findById(req.params.id);

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = {
  getusers: getUsers,
  updateUser,
  addAccount,
};
