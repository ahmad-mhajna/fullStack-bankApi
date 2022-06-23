const express = require("express");
const AccountsRouter = express.Router();
const { getUsers, updateUser, addAccount } = require("../controllers/account");
AccountsRouter.get("/users", getUsers);
AccountsRouter.put("/users/:type", updateUser);
AccountsRouter.post("/users", addAccount);
module.exports = AccountsRouter;
