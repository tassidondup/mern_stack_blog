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

app.listen(5000);
