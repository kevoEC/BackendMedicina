import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { createSimulation, simulationsByPatient } from "../controllers/simulationsController.js";

const router = express.Router();

router.post("/", checkAuth, createSimulation);
router.get("/byPatient/:patientId", checkAuth, simulationsByPatient);

export default router;
