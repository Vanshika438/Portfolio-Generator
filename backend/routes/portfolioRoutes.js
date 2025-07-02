// backend/routes/portfolioRoutes.js
import express from "express";
import { generatePortfolio, downloadPortfolio } from "../controllers/portfolioController.js";

const router = express.Router();

router.post("/generate", generatePortfolio);
router.get("/download/:name", downloadPortfolio);

export default router;
