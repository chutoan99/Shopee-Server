const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    id: {
      type: String,
    },
    mess: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const chatModel = mongoose.model("chatModel", chatSchema);
module.exports = chatModel;
