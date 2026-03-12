import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "TrackHere server is running!"
  });
});

// Expense Routes
app.use("/expenses", expenseRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});