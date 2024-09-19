const mongoose = require("mongoose");

const Test = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tests", Test);
