require("dotenv").config({ silent: process.env.NODE_ENV === "production" });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => {
  console.log("Connected to Database");
});

const topicRouter = require("./routes/topic");
const labelRouter = require("./routes/label");
const paperAnswerRouter = require("./routes/paperAnswer");
const adminRouter = require("./routes/admin");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/topic", topicRouter);
app.use("/admin", adminRouter);

app.use("/label", labelRouter);
app.use("/paperAnswer", paperAnswerRouter);

const PORT = 5000;

app.listen(PORT);
