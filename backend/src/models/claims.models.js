import mongoose, { Schema, model } from "mongoose";

const claimSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Invalid email format"], // Validates email format
  },
  claimAmount: {
    type: Number,
    required: [true, "Claim amount is required"],
    min: [1, "Claim amount must be greater than 0"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  documentUrl: {
    type: String, // URL of the uploaded document (e.g., receipt or prescription)
    required: [true, "Document upload is required"],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"], // Defines possible claim statuses
    default: "pending", // Default status is pending
  },
  submissionDate: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
  approvedAmount: {
    type: Number, // Approved amount entered by the insurer
    min: [0, "Approved amount cannot be negative"],
    default: 0,
  },
  insurerComments: {
    type: String, // Comments provided by the insurer during review
    trim: true,
    maxlength: [500, "Comments cannot exceed 500 characters"],
  },
  insurerId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the insurer who reviewed the claim
  },
});

export const Claim = model("Claim", claimSchema);
