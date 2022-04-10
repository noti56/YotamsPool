const { Schema, model } = require("mongoose");

const schema = new Schema({
  color: { type: String, required: true },
  workerName: { type: String, required: true },
  swimStyles: { type: Array, required: true },
  time: { type: Object, required: true },
});

const MentorSchema = model("mentors", schema);

module.exports = { MentorSchema };
