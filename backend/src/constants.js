import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export const DB_NAME = "ClaimManagementDB";
export const port = process.env.PORT || 8000;
