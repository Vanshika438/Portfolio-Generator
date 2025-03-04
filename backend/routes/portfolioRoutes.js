import express from "express";
import { generatePortfolio } from "../controllers/portfolioController.js";
import { downloadPortfolio } from "../controllers/portfolioController.js";
const router = express.Router();

router.post("/generate", generatePortfolio);
router.get("/download/:name", downloadPortfolio);
export default router;
