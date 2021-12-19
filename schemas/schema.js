const mongoose = require("mongoose");
const { Schema } = mongoose;

const Schemas = new Schema({
  name: String, // String is shorthand for {type: String}
  gender: String,
  date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },
});

module.exports = mongoose.model("Post",Schemas );



