import express from "express";
import { createTest, getAllTests, getTest, updateTest } from "../controllers/testsController.js";

const router = express.Router();

router.get("/", getAllTests);
router.post("/", createTest);
router.put("/:id", updateTest);
router.get("/:id", getTest);


export default router;