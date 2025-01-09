import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const protect = async (req, res, next) => {
  try {
    let token =
      req.cookies?.accessToken ||
      req.body?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "") ||
      null;

    if (!token) {
      console.log("No token provided");
      return res
        .status(401)
        .json({ message: "Not authorized, no token provided." });
    }

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (decoded.exp * 1000 < Date.now()) {
        console.log("Token expired");
        return res
          .status(401)
          .json({ message: "Token expired, please refresh." });
      }

      req.user = await User.findOne({ _id: decoded._id }).select("-password");
      if (!req.user) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found." });
      }

      console.log(
        `Protect Middleware -> req.user: ${JSON.stringify(req.user)}`,
      );
      next();
    } catch (error) {
      console.log("Invalid token", error.message);
      return res
        .status(401)
        .json({ message: "Not authorized, invalid token." });
    }
  } catch (error) {
    console.log("Protect Middleware Error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const authorize = (roles) => {
  return (req, res, next) => {
    console.log(`Authorize Middleware -> Roles: ${roles}`);
    console.log(
      `Authorize Middleware -> req.user: ${JSON.stringify(req.user)}`,
    );

    if (!roles.includes(req.user.role)) {
      console.log("Access denied: User role not authorized");
      return res.status(403).json({ message: "Access denied." });
    }

    console.log("User authorized successfully");
    next();
  };
};
