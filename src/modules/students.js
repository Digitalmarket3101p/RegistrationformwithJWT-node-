const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const studentschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: {
    type: String,
    unique: [true, "Email must be unique"],
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email not valid");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    min: 10,
  },
  DOB: {
    type: String,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  confirmpass: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password are not same!!",
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

studentschema.methods.generatetoken = async function (req,res) {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (e) {
    res.send(e);
    console.log(e);
  }
};

studentschema.pre("save", async function (next) {
  //only run when pass modifed
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmpass = this.password;
  console.log(`${this.password}`);
  next();
});
const student = new mongoose.model("student", studentschema);
module.exports = student;
