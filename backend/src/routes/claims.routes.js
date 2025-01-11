import express from "express";
import {
  submitClaim,
  getAllClaims,
  getClaimById,
  updateClaim,
  getPatientClaims,
  deleteDocument,
  healthCheck,
} from "../controllers/claim.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @desc Submit a new claim
 * @route POST /api/claims
 * @access Private (Patient Only)
 */
router.post("/", protect, authorize("patient"), submitClaim);

/**
 * @desc Get claims for a patient
 * @route GET /api/claims/patient
 * @access Private (Patient Only)
 */
router.get("/patient", protect, authorize("patient"), getPatientClaims);

/**
 * @desc Get all claims
 * @route GET /api/claims
 * @access Private (Insurer Only)
 */
router.get("/", protect, authorize("insurer"), getAllClaims);

/**
 * @desc Get a single claim by ID
 * @route GET /api/claims/:claimId
 * @access Private
 */
router.get("/:claimId", protect, getClaimById);

/**
 * @desc Update a claim
 * @route PUT /api/claims/:claimId
 * @access Private (Insurer Only)
 */
router.put("/:claimId", protect, authorize("insurer"), updateClaim);

router.delete("/", deleteDocument);

router.get("/health", healthCheck);

export default router;
