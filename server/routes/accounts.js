const express = require("express");
const AccountsRouter = express.Router();
const {
  getusers: getUsers,
  updateUser,
  addAccount,
} = require("../controllers/account");
AccountsRouter.get("/users", getUsers);
AccountsRouter.put("/users", updateUser);
AccountsRouter.post("/users", addAccount);
module.exports = AccountsRouter;
