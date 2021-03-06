const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = schema({
  username: { type: String, unique: true },
  local: {
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    emailToken: { type: String, required: true },
    password: String,
    passwordToken: String,
    passwordTokenExpiration: Date,
    googleId: String,
  },
  avatar: { type: String, default: "/images/avatar/no-user.jpeg" },
  following: { type: [schema.Types.ObjectId], ref: "users" },
});

userSchema.statics.hashPassword = async (passowrd) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(passowrd, salt);
  } catch (err) {
    throw err;
  }
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.local.password);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
