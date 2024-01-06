import express from "express";
import { getSimulationUrl } from "../controllers/envsController.js";

const router = express.Router();

router.get("/", getSimulationUrl);

export default router;