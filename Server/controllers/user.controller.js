import bcrypt from "bcryptjs";
import {User} from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body; // role optional

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || "user", // default role is "user"
    });

    await newUser.save();

    const token = generateToken(newUser);
    newUser.tokens = newUser.tokens.concat({ token });
    await newUser.save();

    res.cookie("awaz_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { username: newUser.username, role: newUser.role },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};


// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.cookie("awaz_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { username: user.username, role: user.role },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};



// LOGOUT USER
export const logoutUser = async (req, res) => {
    try {
      // Clear the token cookie
      res.clearCookie("awaz_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
  
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (err) {
      console.error("Logout Error:", err);
      res.status(500).json({ message: "Server error during logout" });
    }
  };
  
