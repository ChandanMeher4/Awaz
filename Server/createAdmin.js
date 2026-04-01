import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";

dotenv.config();

const createAdminUser = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error("MONGO_URI is missing in .env");
      process.exit(1);
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("Connected successfully.");

    const username = process.argv[2] || "admin";
    const password = process.argv[3] || "adminpassword123";

    if (process.argv.length < 4 && process.argv.length > 2) {
      console.warn("⚠️ Warning: You provided a username but no password. Defaulting to 'adminpassword123'");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`User '${username}' already exists. Updating role to admin...`);
      existingUser.role = "admin";
      await existingUser.save();
      console.log("Role updated successfully. You can now log in with your existing password.");
    } else {
      console.log(`Creating new admin user '${username}'...`);
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new User({
        username,
        password: hashedPassword,
        role: "admin",
      });
      await newAdmin.save();
      console.log(`Admin user created successfully!`);
      console.log(`Username: ${username}`);
      console.log(`Password: ${password}`);
    }

    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    mongoose.disconnect();
    process.exit(1);
  }
};

createAdminUser();
