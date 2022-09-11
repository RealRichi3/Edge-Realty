const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String, required: true
    },
    email: {
      type: String, required: true, unmodifiable: true
    },
    user_type: {
      type: String, required: true
    },
    address: {
      type: String, required: true
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

module.exports = { User };
