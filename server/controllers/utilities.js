const Account = require("../models/account");
async function changeMoney(body, params) {
  const type = params.type;
  let id = body.id;
  let amount = body.amount;
  let transferID = body.transferID;
  if (!id || (!transferID && type === "transfer")) {
    throw {
      statusCode: 400,
      message: "Id is not defined",
    };
  }
  if (id === transferID && type === "transfer")
    throw {
      statusCode: 400,
      message: "you cant transfer to your self",
    };

  if (!amount)
    throw {
      statusCode: 400,
      message: "amount is not defined",
    };
  let user = await Account.findById(id);
  if (!user)
    throw {
      statusCode: 404,
      message: "user dose not exist",
    };
  if (amount < 0) {
    throw {
      statusCode: 400,
      message: "the amount cant be negtive",
    };
  }
  if (type === "deposit") {
    user.money += amount;
  }
  if (type === "credit") {
    user.credit = amount;
  }
  if (type === "withdraw") {
    if (user.money + user.credit >= amount) {
      if (user.money - amount <= 0) {
        amount -= user.money;
        user.money = 0;
        user.credit -= amount;
      } else user.money -= amount;
    } else
      throw {
        statusCode: 400,
        message: "not enough money",
      };
  }
  if (type === "transfer") {
    let transferUser = await Account.findById(transferID);
    if (!transferUser)
      throw {
        statusCode: 400,
        message: "trasnferUser dose not exist",
      };

    if (user.money + user.credit >= amount) {
      transferUser.money += amount;
      if (user.money - amount <= 0) {
        amount -= user.money;
        user.money = 0;
        user.credit -= amount;
      } else user.money -= amount;
    } else
      throw {
        statusCode: 400,
        message: "not enough money",
      };
    return [user, transferUser];
  }
  return [user];
}
module.exports = { changeMoney };
