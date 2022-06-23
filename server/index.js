require("dotenv").config();
require("./data/db");
const express = require("express");
const AccountsRouter = require("./routes/accounts");
const server = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
server.use(express.json());
server.use(cors());
server.use("/api", AccountsRouter);

server.listen(port, () => {
  console.log("server is up " + port);
});
