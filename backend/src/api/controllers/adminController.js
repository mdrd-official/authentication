const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const path = require("path");

const adminData = {
  username: "admin",
  password: "admin",
};

const adminLoginPost = async (req, res) => {
  const { username, password } = req.body;
  if (username === adminData.username && password === adminData.password) {
    res.json({ success: true, message: "Admin logged in successfully" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};
const addUser = async (req, res) => {
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

    res.json({ success: true, message: "User Added successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};  
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const editUser = async (req, res) => {
  try {
    const { fullName, username, email, mobile } = req.body.userData;
    const id = req.body.id;
    const user = await User.findById(id);
    user.fullName = fullName;
    user.username = username;
    user.email = email;
    user.mobile = mobile;
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
}
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "User deleted successfully",
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  adminLoginPost,
  getAllUsers,
  addUser,
  getUser,
  editUser,
  deleteUser,
};
