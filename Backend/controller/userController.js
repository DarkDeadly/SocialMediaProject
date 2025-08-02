const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel");
const HandleAsync = require("express-async-handler");
const { validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");

const RegisterUser = HandleAsync(async (req, res) => {
  const { username, email, password } = req.body;

  const Errors = validationResult(req);
  if (!Errors.isEmpty()) {
    return res.status(400).json({ errors: Errors.array() });
  }

  //Checking both email and username if they exist
  const EmailExists = await UserModel.findOne({ email });
  const usernameExist = await UserModel.findOne({ username });
  if (EmailExists) {
    return res.status(409).json({ success: false, message: "The email is already taken" });
  }
  if (usernameExist) {
    return res.status(409).json({ success: false, message: "The Username is already taken" });
  }
  // Checking Datas
  if (!email || !password || !username) {
    return res.status(400).json({
      success: false,
      message: "Please enter the necessary credentials",
    });
  }
  //Hashing the Password
  const HashedPassword = await bcrypt.hash(password, 10);
  //adding the user Information to the Database
  const user = await UserModel.create({
    email,
    password: HashedPassword,
    username,
  });

  if (user) {
    const token = SignJwt(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user: { email, username },
    });
  }
});

const LoginUser = HandleAsync(async (req, res) => {
  const { email, password } = req.body;
  const ExistingEmail = await UserModel.findOne({ email });
  if (!ExistingEmail) {
    return res.status(400).json({ success: false, message: "Invalid credentials" });
  }
  const VerifyPassword = await bcrypt.compare(password, ExistingEmail.password);
  if (!VerifyPassword) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  const token = SignJwt(ExistingEmail._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ success: true, message: "Successfully logged in" , token});
});

const GetUser = HandleAsync(async (req, res) => {
  const user = await UserModel.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found. Please check credentials." });
  }
  return res.status(200).json({ success: true, user });
});

const LogoutUser = HandleAsync(async(req , res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  return res.status(200).json({ success: true, message: "Logged out successfully" });
})

const SignJwt = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { RegisterUser, LoginUser, GetUser ,LogoutUser };