import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // 1. Frontend se data lein (Signup.tsx form se)
  // Hum 'body-parser' (jo ab Express mein shamil hai) ko enable kareinge
  const { name, email, password } = req.body;

  // 2. Check karein ke user pehle se mojood hai
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // 400 Bad Request
    throw new Error("User already exists");
  }

  // 3. Naya user banayein (password automatically hash hojayega 'userModel.js' ki wajah se)
  const user = await User.create({
    name,
    email,
    password,
  });

  // 4. Agar user bann gaya, toh token ke saath response wapas bhejein
  if (user) {
    res.status(201).json({
      // 201 Created
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id), // Token generate karein
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  // 1. Frontend se data lein (Login.tsx form se)
  const { email, password } = req.body;

  // 2. User ko email se dhoondein
  const user = await User.findOne({ email });

  // 3. Agar user mila aur password match hua (yeh 'userModel.js' ka function hai)
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id), // Token generate karein
    });
  } else {
    res.status(401); // 401 Unauthorized
    throw new Error("Invalid email or password");
  }
});

export { registerUser, loginUser };
