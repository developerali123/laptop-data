import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // <-- [1] CORS ko import karein
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; // <-- [2] Auth routes ko import karein
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"; // <-- [3] Error handlers ko import karein

dotenv.config();
connectDB();

const app = express();

// --- Middlewares ---

// CORS ko enable karein (taake React app connect kar sake)
app.use(cors()); // <-- [4] YEH ADD KAREIN

// Yeh middleware express ko batata hai ke JSON data ko accept karo
// Yeh 'req.body' ko parse karne ke liye zaroori hai
app.use(express.json()); // <-- [5] YEH ADD KAREIN

// --- Routes ---
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Jab bhi koi /api/auth se request aaye, usse 'authRoutes' file handle karegi
app.use("/api/auth", authRoutes); // <-- [6] YEH ADD KAREIN

// --- Error Handling ---
// Yeh routes ke baad aane chahiye
app.use(notFound); // <-- [7] YEH ADD KAREIN
app.use(errorHandler); // <-- [8] YEH ADD KAREIN

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
