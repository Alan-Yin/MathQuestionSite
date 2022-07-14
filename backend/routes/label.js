const express = require("express");
const router = express.Router();
const Label = require("../models/label");
const labelArray = ["topic", "grade", "year"];
const labelTextArray = ["TopicLabel", "GradeLabel", "YearLabel"];

/// Topic

labelArray.map((e, index) => {
  router.post("/" + e + "/add", async (req, res) => {
    try {
      // Find Parent label
      const parentLabel = await Label[labelTextArray[index]].findById(
        req.body.id
      );
      // save New label
      const label = new Label[labelTextArray[index]]({
        ...req.body,
        root: parentLabel ? false : true,
      });
      const savedLabel = await label.save();
      // Ref, save

      if (parentLabel) {
        parentLabel.level = parentLabel.level.concat(savedLabel._id);
        await parentLabel.save();
      }

      res.send(savedLabel);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  router.post("/" + e + "/rename", async (req, res) => {
    try {
      // Find Parent label
      let parentLabel = await Label[labelTextArray[index]].findById(
        req.body.id
      );
      parentLabel.content = req.body.content;
      await parentLabel.save();

      res.send(parentLabel);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  router.delete("/" + e + "/deleteAll", (req, res) => {
    Label[labelTextArray[index]].deleteMany({}).then((e) => {
      res.json(e);
    });
  });

  router.delete("/" + e + "/delete", (req, res) => {
    Label[labelTextArray[index]].deleteMany({ _id: req.body.id }).then((e) => {
      res.json(e);
    });
  });

  router.get("/" + e + "/labelList", async (req, res) => {
    try {
      Label[labelTextArray[index]]
        .find({ root: true })
        .sort({ createdAt: 1 })
        .exec((err, label) => {
          if (err) {
            res.status(400).json(`Error: ${err}`);
          } else {
            res.json(label);
          }
        });
    } catch (err) {
      res.status(400).send(err);
    }
  });

  //inquiry
  router.post("/" + e + "/inquiry", async (req, res) => {
    try {
      //validation

      if (!req.body.ids) {
        res.json([]);
        return;
      }
      Label[labelTextArray[index]]
        .find({
          _id: req.body.ids,
        })
        .exec((err, label) => {
          if (err) {
            console.log(err);
            res.status(400).json(`Error: ${err}`);
          } else {
            console.log("label", label);

            res.json(label);
          }
        });
    } catch (err) {
      res.status(400).send(err);
    }
  });

  router.post("/" + e + "/inquiryMany", async (req, res) => {
    try {
      //validation
      let { uploadData } = req.body;
      const labelIndex = uploadData[0].findIndex((e) => e === "FAULT LABEL");
      let ids = [];
      let lengthArray = [];
      for (let i = 1; i < uploadData.length; i++) {
        ids = ids.concat(uploadData[i][labelIndex]);
        lengthArray.push(uploadData[i][labelIndex].length);
      }

      console.log("ids", ids);
      console.log("lengthArray", lengthArray);

      const label = await Label[labelTextArray[index]]
        .find({ _id: { $in: ids } })
        .exec();

      var objects = {};
      label.forEach((o) => (objects[o._id] = o));

      var dupArray = ids.map((id) => objects[id]);
      // here you have objects with duplicates in dupArray:

      let count = 0;
      for (let i = 0; i < uploadData.length - 1; i++) {
        const times = lengthArray[i];

        uploadData[i + 1][labelIndex] = dupArray.slice(count, count + times);
        count = count + times;
      }

      res.json(uploadData);
    } catch (err) {
      res.status(400).send(err);
    }
  });
});

module.exports = router;
