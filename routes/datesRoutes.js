import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  createDate,
  getDatesByEspecialist,
  editDates,
  getDatesRecent,
  getDatesByPatient,
  deleteDate,
  getLastMeasuresBy,
  storeCall,
  getDateById,
} from "../controllers/datesController.js";

const router = express.Router();

router.post("/", checkAuth, createDate);
router.get("/byEspecialist/:id", checkAuth, getDatesByEspecialist);
router.put("/:id", checkAuth, editDates);
router.get("/datesrecent", checkAuth, getDatesRecent);
router.get("/byPatient/:id", checkAuth, getDatesByPatient);
router.post("/delete/:id", checkAuth, deleteDate)
router.get("/lastMeasuresBy/:id",  checkAuth, getLastMeasuresBy)
router.get('/storeCall', storeCall)
router.get('/:id', checkAuth, getDateById)
export default router;
