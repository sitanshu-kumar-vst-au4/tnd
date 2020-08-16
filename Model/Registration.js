const db = require("../Database/db-connection");
const Sequelize = require("sequelize");

const Registration = db.define(
  "registrationdata",
  {
    uid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    pnumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    emailid: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    pwd: {
      type: Sequelize.STRING,
    },
    rdateime: {
      type: Sequelize.DATE,
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
    createdby: {
      type: Sequelize.STRING,
    },
    tc_name: {
      type: Sequelize.STRING,
    },
    tc_email: {
      type: Sequelize.STRING,
    },
    tc_city: {
      type: Sequelize.STRING,
    },
    tc_state: {
      type: Sequelize.STRING,
    },
    tc_fb_link: {
      type: Sequelize.STRING,
    },
    email_ver: {
      type: Sequelize.STRING,
    },
    acheck: {
      type: Sequelize.STRING,
    },
    mcall: {
      type: Sequelize.STRING,
    },
    ustatus: {
      type: Sequelize.STRING,
    },
    comment1: {
      type: Sequelize.STRING,
    },
    vdatetime: {
      type: Sequelize.DATE,
    },
    verifiedby: {
      type: Sequelize.STRING,
    },
    updatedby: {
      type: Sequelize.STRING,
    },
    comment2: {
      type: Sequelize.STRING,
    },
    udatetime: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
  }
);

db.sync().then(() => console.log("Registration DB has created"));

module.exports = Registration;
