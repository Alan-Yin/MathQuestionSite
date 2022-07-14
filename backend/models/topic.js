const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TopicSchema = new Schema({
  
  content: {
    type: String,
    required: true,
  },
  answerDetail: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  }, // 0 single 1 multiple 2 fill
  answer: [
    {
      type: String,
      required: true,
    },
  ],
  topicLabel: [
    { type: Schema.Types.ObjectId, ref: "TopicLabel", required: true },
  ],
  yearLabel: { type: Schema.Types.ObjectId, ref: "YearLabel", required: true },
});

module.exports = mongoose.model("Topic", TopicSchema);
