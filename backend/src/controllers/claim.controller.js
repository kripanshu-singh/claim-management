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
  const { name, email, claimAmount, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Document upload is required." });
  }

  // Upload file to Cloudinary
  const documentUpload = await uploadOnCloudinary(req.file.path);
  console.log(`\n ~ submitClaim ~ documentUpload :- `, documentUpload);

  if (!documentUpload || !documentUpload.url) {
    return res.status(500).json({ message: "Failed to upload document." });
  }

  try {
    const claim = await Claim.create({
      name,
      email,
      claimAmount,
      description,
      documentUrl: documentUpload.url,
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

// ! Upload 1
// export const submitClaim = async (req, res) => {
//   const { name, email, claimAmount, description, documentUrl } = req.body;

//   try {
//     // Create a new claim
//     const newClaim = await Claim.create({
//       name,
//       email,
//       claimAmount,
//       description,
//       documentUrl,
//     });

//     return res.status(201).json({
//       message: "Claim submitted successfully.",
//       claim: newClaim,
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error submitting claim.", error: error.message });
//   }
// };

// /**
//  * @desc Get all claims (for insurers)
//  * @route GET /api/claims
//  * @access Private (Insurer Only)
//  */
export const getAllClaims = async (req, res) => {
  const { status, startDate, endDate, minAmount, maxAmount } = req.query;

  try {
    // Build the query dynamically
    const query = {};

    if (status) query.status = status;
    if (startDate || endDate) query.submissionDate = {};
    if (startDate) query.submissionDate.$gte = new Date(startDate);
    if (endDate) query.submissionDate.$lte = new Date(endDate);
    if (minAmount || maxAmount) query.claimAmount = {};
    if (minAmount) query.claimAmount.$gte = Number(minAmount);
    if (maxAmount) query.claimAmount.$lte = Number(maxAmount);

    // Fetch claims based on the query
    const claims = await Claim.find(query)
      .populate("insurerId", "name email")
      .sort({ submissionDate: -1 }); // Sort by submissionDate in descending order

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

    // Update claim details
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
    // Retrieve user data
    const user = await User.findById(req.user._id);

    console.log(`\n ~ getPatientClaims ~ req.user :- `, req.user);

    // Ensure that the email is being retrieved correctly
    if (!req.user || !req.user.email) {
      return res.status(400).json({
        message: "User email is missing or invalid.",
      });
    }

    // Extract filters from query parameters
    const { status, startDate, endDate, minAmount, maxAmount } = req.query;

    // Build the query object dynamically
    const query = { email: req.user.email }; // Start with filtering by user's email

    if (status) query.status = status; // Filter by claim status

    if (startDate || endDate) query.submissionDate = {}; // Initialize submissionDate filter
    if (startDate) query.submissionDate.$gte = new Date(startDate); // Filter by start date
    if (endDate) query.submissionDate.$lte = new Date(endDate); // Filter by end date

    if (minAmount || maxAmount) query.claimAmount = {}; // Initialize claimAmount filter
    if (minAmount) query.claimAmount.$gte = Number(minAmount); // Filter by minimum amount
    if (maxAmount) query.claimAmount.$lte = Number(maxAmount); // Filter by maximum amount
    console.log(`\n ~ getPatientClaims ~ query :- `, query);

    // Fetch claims based on the query
    const claims = await Claim.find(query);

    return res.status(200).json({ claims });
  } catch (error) {
    console.error("Error fetching patient claims:", error);
    return res.status(500).json({
      message: "Error fetching patient claims.",
      error: error.message,
    });
  }
};
