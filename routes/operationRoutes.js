import express from "express";
import { createInd, getAllInd, getInd, updateInd } from "../controllers/operationController.js";

const router = express.Router();

router.get("/", getAllInd);
router.post("/", createInd);
router.put("/:id", updateInd);
router.get("/:id", getInd);


export default router;