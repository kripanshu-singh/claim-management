import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Invalid email format"], // Validates email format
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"], // Minimum password length
    select: false, // Password won't be returned by default in queries
  },
  role: {
    type: String,
    default: "patient",
    enum: ["patient", "insurer"], // Define possible roles
    required: [true, "User role is required"],
  },
  dateCreated: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); // Hash with a salt round of 10
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Hash the password when updating via findOneAndUpdate
userSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 10);
  }
  next();
});

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, role: this.role }, // Include role for role-based access control
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const User = model("User", userSchema);
