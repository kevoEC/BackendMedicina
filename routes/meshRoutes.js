import express from "express";
import { createAvatar, createImage, fitAvatar, getAvatar } from "../controllers/meshController.js";

const router = express.Router();

router.post("/createAvatar", createAvatar);

router.post("/createImage", createImage);

router.post("/fitAvatar", fitAvatar);

router.post("/getAvatar", getAvatar);

export default router;
