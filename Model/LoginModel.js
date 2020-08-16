const db = require("../Database/db-connection");
const Sequelize = require("sequelize");

const LoginData = db.define(
  "logindata",
  {
    uid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    dtype: {
      type: Sequelize.STRING,
    },
    btype: {
      type: Sequelize.STRING,
    },
    ip_add: {
      type: Sequelize.STRING,
    },
    ldatetime: {
      type: Sequelize.DATE,
    },
    lodatetime: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
  }
);

db.sync().then(() => console.log("Login DB has created"));

module.exports = LoginData;
