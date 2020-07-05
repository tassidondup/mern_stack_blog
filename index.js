const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://tassi:tassi@donz4397@chatapp.uarcu.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  // console.log("Hello World from Express App");
  res.send("Hello World from Express App");
});

app.listen(5000);
