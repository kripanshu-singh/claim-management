import { Claim } from "../models/claims.models.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/uploadCloudinary.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
/**
 * @desc Submit a new claim
 * @route POST /api/claims
 * @access Private (Patient Only)
 */
export const submitClaim = asyncHandler(async (req, res) => {
  const { name, email, claimAmount, description, document } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Patient name is required." });
  }
  if (!email || email.trim() === "") {
    return res.status(400).json({ message: "Patient email is required." });
  }
  if (!document || document.trim() === "") {
    return res.status(400).json({ message: "Document URL is required." });
  }

  try {
    const claim = await Claim.create({
      name,
      email,
      claimAmount,
      description,
      documentUrl: document,
      ownerId: req.user._id,
    });

    res.status(201).json({
      message: "Claim submitted successfully.",
      claim,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting claim.", error: error.message });
  }
});

export const getAllClaims = async (req, res) => {
  const { status, startDate, endDate, minAmount, maxAmount } = req.query;

  try {
    const query = {};

    if (status) query.status = status;
    if (startDate || endDate) query.submissionDate = {};
    if (startDate) query.submissionDate.$gte = new Date(startDate);
    if (endDate) query.submissionDate.$lte = new Date(endDate);
    if (minAmount || maxAmount) query.claimAmount = {};
    if (minAmount) query.claimAmount.$gte = Number(minAmount);
    if (maxAmount) query.claimAmount.$lte = Number(maxAmount);

    const claims = await Claim.find(query)
      .populate("insurerId", "name email")
      .sort({ updatedAt: -1 });

    return res.status(200).json({ claims });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching claims.", error: error.message });
  }
};

/**
 * @desc Get a single claim by ID
 * @route GET /api/claims/:claimId
 * @access Private
 */
export const getClaimById = async (req, res) => {
  const { claimId } = req.params;

  try {
    const claim = await Claim.findById(claimId).populate(
      "insurerId",
      "name email",
    );
    if (!claim) {
      return res.status(404).json({ message: "Claim not found." });
    }

    return res.status(200).json({ claim });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching claim.", error: error.message });
  }
};

/**
 * @desc Update a claim (for insurers)
 * @route PUT /api/claims/:claimId
 * @access Private (Insurer Only)
 */
export const updateClaim = async (req, res) => {
  const { claimId } = req.params;
  const { status, approvedAmount, insurerComments } = req.body;

  try {
    const claim = await Claim.findById(claimId);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found." });
    }

    if (status) claim.status = status;
    if (approvedAmount !== undefined) claim.approvedAmount = approvedAmount;
    if (insurerComments) claim.insurerComments = insurerComments;
    claim.insurerId = req.user._id;

    await claim.save();

    return res.status(200).json({
      message: "Claim updated successfully.",
      claim,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating claim.", error: error.message });
  }
};

/**
 * @desc Get claims for a patient
 * @route GET /api/claims/patient
 * @access Private (Patient Only)
 */
export const getPatientClaims = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
      });
    }

    const { status, startDate, endDate, minAmount, maxAmount } = req.query;

    const query = { ownerId: req.user._id };

    if (status) query.status = status;

    if (startDate || endDate) query.submissionDate = {};
    if (startDate) query.submissionDate.$gte = new Date(startDate);
    if (endDate) query.submissionDate.$lte = new Date(endDate);

    if (minAmount || maxAmount) query.claimAmount = {};
    if (minAmount) query.claimAmount.$gte = Number(minAmount);
    if (maxAmount) query.claimAmount.$lte = Number(maxAmount);

    const claims = await Claim.find(query)
      .populate("insurerId", "name email")
      .sort({ updatedAt: -1 });

    return res.status(200).json({ claims });
  } catch (error) {
    console.error("Error fetching patient claims:", error);
    return res.status(500).json({
      message: "Error fetching patient claims.",
      error: error.message,
    });
  }
};

/**
 * @desc Delete the document for a patient
 * @route Delete /api/claims/
 * @access Private (Patient Only)
 */
export const deleteDocument = async (req, res, next) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: "publicId is required to delete the document",
      });
    }

    const response = await deleteFromCloudinary(publicId);

    if (response?.result === "ok") {
      return res.status(200).json({
        success: true,
        message: "Document deleted successfully",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete the document",
    });
  } catch (error) {
    console.error("Error in deleteDocument controller:", error);
    next(new ApiError("An error occurred while deleting the document", 500));
  }
};

export const healthCheck = (req, res) => {
  console.log("first");
  res.status(200).json({
    success: true,
    message: "The server is healthy",
  });
};
