const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");
const { User } = require("./models/user");

// const dbURI =
//   "mongodb+srv://tassi:tassi@donz4397@chatapp.uarcu.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  // console.log("Hello World from Express App");
  res.send("Hello World from Express App");
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userData) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/api/user/login", (req, res) => {
  // find email in database
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    // compare the hased password with database hashed password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "Wrong password",
        });
    });

    //generate Token
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie("x_auth", user.token).status(200).json({
        loginSuccess: true,
      });
    });
  });
});

app.listen(5000);
