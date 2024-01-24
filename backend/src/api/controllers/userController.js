const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const { fullName, username, email, mobile, password } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, username, email, mobile, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt for user:', username);

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' } // Optionally set an expiration time for the token
    );

    console.log('Generated JWT token:', token);

    res.cookie("token", token, { httpOnly: true });
 
    res.json({ success: true, message: "User logged in successfully", user: user});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserProfileImage = async (req, res, next) => {
  try {
    const imagePath = req.file.path;
   
    const imageUrl = path.relative("src/api/public", imagePath);
    console.log(imageUrl);

    const user = await User.findById(req.user._id);
    user.image = imageUrl;
   
    const updatedUser = await user.save();

    res.json({
      success: true,
      message: "User profile image updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const updateUserProfile = async (req, res, next) => {
  try {
    const { fullName, username, email, mobile } = req.body;
    console.log(req.body);

    const user = await User.findById(req.user._id);

    if (fullName) user.fullName = fullName;
    if (username) user.username = username;
    if (email) user.email = email;
    if (mobile) user.mobile = mobile;

    const updatedUser = await user.save();

    res.json({                                                                        
      success: true,
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfileImage,
  getUserProfile,
  updateUserProfile,
};
