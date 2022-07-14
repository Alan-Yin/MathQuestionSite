const { version } = require("joi");

const mongoose = require("mongoose");

const Populate = require("../util/autopopulate");

const Schema = mongoose.Schema;

const labelArray = ["TopicLabel", "GradeLabel", "YearLabel"];
let moduleList = {};
let LabelSchema = null;

labelArray.map((e) => {
  LabelSchema = new Schema(
    {
      content: {
        type: String,
        required: true,
      },
    
      root: {
        type: Boolean,
      },
      level: [{ type: Schema.Types.ObjectId, ref: e, required: false }],
    },
    { timestamps: true }
  );
  LabelSchema.pre("findOne", Populate("level")).pre("find", Populate("level"));

  moduleList[e] = mongoose.model(e, LabelSchema);
});

module.exports = moduleList;
