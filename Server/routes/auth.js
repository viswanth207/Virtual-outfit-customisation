const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Helper function to set cookie options for cross-origin production
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // only use HTTPS in production
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // cross-origin if production
  expires: new Date(Date.now() + 8 * 3600000), // 8 hours expiry
};

// ================== SIGNUP ==================
authRouter.post("/signup", async (req, res) => {
  try {
    // Validate signup data
    validateSignUpData(req);

    const { userName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      userName,
      emailId,
      password: passwordHash,
    });
    await user.save();

    // Create JWT token
    const token = await user.getJWT();

    // Send the token in a cookie
    res.cookie("token", token, cookieOptions);

    // Send user object after setting cookie
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ================== LOGIN ==================
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const token = await user.getJWT();

    // Add the token to cookie
    res.cookie("token", token, cookieOptions);

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ================== LOGOUT ==================
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", "", {
    ...cookieOptions,
    expires: new Date(0), // Expire immediately
  });
  res.status(200).json({ message: "Logout Successful!!" });
});

module.exports = authRouter;
