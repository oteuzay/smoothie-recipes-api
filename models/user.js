const mongoose = require("mongoose");

/* Bcrypt is used to hash the user's password before saving it to the database, 
and to compare the user's input password with the hashed password during authentication. */
const bcrypt = require("bcrypt");

/* The code is defining a Mongoose schema for a user. */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Name",
      required: true,
    },
    surname: {
      type: String,
      default: "Surname",
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", userSchema);
