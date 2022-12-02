const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  permissions: {
    admin: { type: Boolean, default: false },
    buyer: { type: Boolean, default: true },
    seller: { type: Boolean, default: false },
  },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
  isActive: {
    type: Boolean,
    default: true,
  },
  // number :{
  //     type: Number,
  //     required: false,
  // },
  // address: {
  //     type: String,
  //     required: true,
  // },
  // date: {
  //     type: Date,
  //     default: Date.now,
  // },
});

module.exports = User = mongoose.model("User", UserSchema);
