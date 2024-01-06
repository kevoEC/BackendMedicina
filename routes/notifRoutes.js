import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { createNotification, notificationsByReceiver, readNotification } from "../controllers/notifController.js";

const router = express.Router();

router.post("/", checkAuth, createNotification);
router.put("/:id", checkAuth, readNotification);
router.get("/byReceiver/:receiverId", checkAuth, notificationsByReceiver);

export default router;
