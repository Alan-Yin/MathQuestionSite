const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Populate = require("../util/autopopulate");

const PaperAnswerSchema = new Schema({
  number: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  answerLengthArray: [{ type: String, required: true }],
  paperType: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  unitname: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: false,
  },

  topicList: [{ type: Schema.Types.ObjectId, ref: "Topic", required: true }],

  singlePropotion: {
    type: String,
    required: true,
  },
  multiplePropotion: {
    type: String,
    required: true,
  },
  fillPropotion: {
    type: String,
    required: true,
  },
  singleCount: {
    type: Number,
    required: true,
  },
  multipleCount: {
    type: Number,
    required: true,
  },
  fillCount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("PaperAnswer", PaperAnswerSchema);
