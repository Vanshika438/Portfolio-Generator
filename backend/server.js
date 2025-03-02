import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import path from "path";
dotenv.config();

const app = express(); // ✅ Initialize Express

app.use(cors());
app.use(express.json()); // ✅ Middleware to parse JSON

app.use("/api/portfolio", portfolioRoutes); // ✅ Register portfolio routes
app.use("/generated",express.static(path.join("generated")));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
