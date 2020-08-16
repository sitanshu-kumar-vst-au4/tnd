var express = require("express");
var path = require("path");
var logger = require("morgan");
var app = express();
var cors = require("cors");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Routes
app.use("/registration", require("./Controller/Registration"));

const port = 3300;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

module.exports = app;
