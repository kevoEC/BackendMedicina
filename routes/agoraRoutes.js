import express from "express";
import { join } from "../controllers/agoraController.js";

const router = express.Router();

router.post("/", join);

export default router;