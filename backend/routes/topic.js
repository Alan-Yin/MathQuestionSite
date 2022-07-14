const express = require("express");
const router = express.Router();
const Topic = require("../models/topic");

router.post("/add", async (req, res) => {
  try {
    const topic = new Topic({
      ...req.body,
    });

    console.log(req.body);
    // res.send(req.body);

    const savedTopic = await topic.save();
    res.send(savedTopic);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/edit", async (req, res) => {
  try {
    let topic = await Topic.findById(req.body.id);
    topic.content = req.body.content;
    topic.answerDetail = req.body.answerDetail;
    topic.answer = req.body.answer;
    topic.type = req.body.type;
    topic.yearLabel = req.body.yearLabel;
    topic.topicLabel = req.body.topicLabel;
    const savedTopic = await topic.save();
    res.send(savedTopic);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/getAllTopic", async (req, res) => {
  try {
    Topic.find({}).exec((err, topic) => {
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

router.post("/labelInquiry", async (req, res) => {
  try {
    console.log("req.body", req.body);

    Topic.find({ topicLabel: { $in: req.body.topicLabel } })
      .populate("topicLabel")
      .populate("yearLabel")
      .exec((err, topic) => {
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

router.post("/getOneTopic", async (req, res) => {
  try {
    Topic.find({ _id: req.body.id })
      .populate("topicLabel")
      .populate("yearLabel")
      .exec((err, topic) => {
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

router.post("/inquiry", async (req, res) => {
  try {
    //validation
    if (!(req.body.yearLabel && req.body.topicLabel)) {
      res.json([]);
      return;
    }

    if (req.body.yearLabel === "allChoose") {
      Topic.find({
        topicLabel: req.body.topicLabel,
      })
        .populate("topicLabel")
        .exec((err, topic) => {
          if (err) {
            res.status(400).json(`Error: ${err}`);
          } else {
            console.log("topic", topic);
            res.json(topic);
          }
        });
    } else {
      Topic.find({
        yearLabel: req.body.yearLabel,
        topicLabel: req.body.topicLabel,
      })
        .populate("topicLabel")
        .populate("yearLabel")
        .exec((err, topic) => {
          if (err) {
            res.status(400).json(`Error: ${err}`);
          } else {
            res.json(topic);
          }
        });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/deleteAllTopic", (req, res) => {
  Topic.deleteMany({}).then((e) => {
    res.json(e);
  });
});

router.delete("/deleteTopic", (req, res) => {
  Topic.deleteOne({ _id: req.body._id }).then((e) => {
    res.json(e);
  });
});

module.exports = router;
