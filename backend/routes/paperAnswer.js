const express = require("express");
const router = express.Router();
const PaperAnswer = require("../models/paperAnswer");

router.post("/add", async (req, res) => {
  try {
    let checkExist = await PaperAnswer.find({ number: req.body.number });
    if (checkExist.length) {
      res.send("Paper Exists");
      return;
    }

    const paperAnswer = new PaperAnswer({
      ...req.body,
    });

    const savedPaperAnswer = await paperAnswer.save();
    res.send(savedPaperAnswer);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/get", async (req, res) => {
  try {
    PaperAnswer.find({}).exec((err, topic) => {
      if (err) {
        res.status(400).json(`Error: ${err}`);
      } else {
        res.json(topic);
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/deleteAll", (req, res) => {
  PaperAnswer.deleteMany({}).then((e) => {
    res.json(e);
  });
});

router.post("/inquiry", async (req, res) => {
  try {
    //validation

    PaperAnswer.find({
      number: req.body.number,
    })
      .populate({
        path: "topicList",
        // populate: {
        //   path: "topicLabel",
        // },
      })
      .exec((err, paperAnswer) => {
        if (err) {
          res.status(400).json(`Error: ${err}`);
        } else {
          res.json(paperAnswer);
        }
      });
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
