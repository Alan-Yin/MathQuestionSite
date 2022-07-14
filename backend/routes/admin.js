const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  try {
    const { account, password } = req.body;
    const admin = await Admin.find({ account: account });
    if (admin.length === 0) {
      res.send(false);
      return;
    }
    const result = await bcrypt.compare(password, admin[0].password);

    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/add", async (req, res) => {
  try {
    const admin = new Admin({
      ...req.body,
    });

    const savedAdmin = await admin.save();

    res.send(savedAdmin);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
