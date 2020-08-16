const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = "tnd";
const Registration = require("../Model/Registration");
const LoginData = require("../Model/LoginModel");
const requestIp = require("request-ip");
const datetime = require("./datetime");

// route for create profile
router.post("/", async (req, res) => {
  try {
    const clientIp = requestIp.getClientIp(req);
    var data = {
      ip_add: clientIp,
      rdateime: datetime(),
    };

    const requestBody = { ...req.body, ...data };
    console.log(requestBody);
    let result = await Registration.create(requestBody);

    res.status(200).json({ msg: "Registered Sucessfully" });
  } catch (err) {
    res.status(400).json(err.errors[0].message);
  }
});

router.post("/find", async (req, res) => {
  const { body } = req;
  try {
    let user = await Registration.findOne({
      where: {
        emailid: [body.emailid],
        // password: [body.password],
      },
    });
    if (!user) {
      return res.status(400).json({ emailid: "User not found" });
    }
    if (user.pwd !== body.pwd) {
      return res.status(400).json({ pwd: "Incorrect Password" });
    }
    let data = user.dataValues;
    console.log("Login BE", data);
    jwt.sign(data, secret, (error, token) => {
      if (error) {
        res.sendStatus(403).json(error);
      } else {
        res.json({
          data,
          token: token,
        });
        const clientIp = requestIp.getClientIp(req);
        var dataToStoreInLogin = {
          uid: req.body.uid,
          ip_add: clientIp,
          ldatetime: datetime(),
        };
        //let result = LoginData.create(dataToStoreInLogin);
      }
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get("/tokenverify", (req, res) => {
  const bearer = req.headers["authorization"];
  if (bearer) {
    const bearerToken = bearer.split(" ");
    const token = bearerToken[1];
    jwt.verify(token, secret, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json(data);
      }
    });
  } else {
    res.sendStatus(403);
  }
});

//function to check email id or phone
router.post("/checkEmailPhone", async (req, res) => {
  const { body } = req;
  let data = "";
  try {
    if (body.emailid) {
      let data = await Registration.findOne({
        where: {
          emailid: [body.emailid],
        },
      });

      if (data)
        res.status(200).json({
          status: true,
          msg: "email id found",
          emailid: data.emailid,
        });
      else {
        res.status(400).json({
          status: false,
          msg: "so such email found",
        });
      }
    } else if (body.pnumber) {
      let data = await Registration.findOne({
        where: {
          pnumber: [body.pnumber],
        },
      });
      if (data)
        res.status(200).json({
          status: true,
          msg: "Phone number exist",
          pnumber: data.pnumber,
        });
      else {
        res.status(400).json({
          status: false,
          msg: "so such phone number found",
        });
      }
    }
  } catch {
    res.status(400).json({
      msg: "something went wrong",
    });
  }
});

module.exports = router;
