import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
//! configuring dotenv
dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

//! Making in JSON
app.use(express.json({ limit: "16kb" }));

//! URL encoder
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  }),
);

//! Static Files
app.use(express.static("public"));
app.use(cookieParser());

//! Routes
import userRoute from "./routes/users.routes.js";
app.use("/api/users", userRoute);

import claimRoutes from "./routes/claims.routes.js";
app.use("/api/claim", claimRoutes);

export { app };
