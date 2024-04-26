const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createUser(firstName, lastName, email, password) {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const userNoPassword = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        _id: newUser._id,
        __v: newUser.__v,
      };

    return userNoPassword;
  } catch (error) {
    throw error;
  }
}

async function findByEmail(email) {
  return await User.findOne({ email });
}

async function login(email, password) {
  const user = await User.findOne({ email });
  const error = new Error("Username or password is incorrect");
  if (!user) {
    return error;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw error
  }

  const JWT_SECRET = process.env.JWT_SECRET;

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1w" });

  const userNoPassword = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    _id: user._id,
    __v: user.__v,
  };

  return { userNoPassword, token };
}

module.exports = { createUser, findByEmail, login };
