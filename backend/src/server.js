import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import predictRoutes from "./routes/predictRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/predict", predictRoutes);
app.use("/api/library", libraryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}) 