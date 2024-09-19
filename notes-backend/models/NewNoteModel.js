const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const NewNotesTemplate = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SignupTemplate = mongoose.Schema(
  {
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
    notes: { type: [NewNotesTemplate] },
    token: String,
  },
  { timestamps: true }
);

SignupTemplate.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

SignupTemplate.methods.genAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.SECRET_TOKEN
  );
  return token;
};

SignupTemplate.statics.findByCredentials = async (email, password) => {
  try {
    const user = await Signup.findOne({ email });
    if (!user) {
      throw new Error("Unable to login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Not match");
    }
    return user;
  } catch (error) {
    return error;
  }
};

SignupTemplate.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const Signup = mongoose.model("mytable", SignupTemplate);

module.exports = Signup;
