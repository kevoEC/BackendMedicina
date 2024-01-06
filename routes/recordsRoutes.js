import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  createRecord,
  editRecords,
  getRecordsRecent,
} from "../controllers/recordsController.js";

const router = express.Router();

router.post("/", checkAuth, createRecord);
router.put("/:id", checkAuth, editRecords);
router.get("/recordsrecent", checkAuth, getRecordsRecent);

export default router;
