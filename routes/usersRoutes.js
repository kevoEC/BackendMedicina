import express from "express";
import {
  login,
  registerPatients,
  registerDoctors,
  forgetPassword,
  findoutToken,
  NewPassword,
  getPatients,
  registerNutri,
  profile,
  editUsers,
  editProfile,
  getSpecialists,
  getPatient,
  getDateSpecialists,
  getSpecialist,
  getUsersRecent,
  getUsersRegisterRecent,
  Info,
  registerPsicologist,
  ChangeState,
  sendWarning,
  searchPatients,
  searchSpecialists,
  sendTest,
  deletePatientsExcept
} from "../controllers/usersController.js";
import checkAuth from "../middleware/checkAuth.js";
import { testEmail } from "../helpers/emails.js";

const router = express.Router();

router.post("/patients", registerPatients);
router.post("/info", Info);
router.post("/doctors", checkAuth, registerDoctors);
router.post("/nutri", checkAuth, registerNutri);
router.post("/psicologist", checkAuth, registerPsicologist);
router.route("/profile").get(checkAuth, profile).put(checkAuth, editProfile);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.route("/forget-password/:token").get(findoutToken).post(NewPassword);
router.get("/patients", checkAuth, getPatients);
router.get("/specialists", checkAuth, getSpecialists);
router.get("/datespecialists", checkAuth, getDateSpecialists);
router.put("/:id", checkAuth, editUsers);
router.get("/patients/:id", checkAuth, getPatient);
router.get("/specialist/:id", checkAuth, getSpecialist);
router.get("/usersrecent", checkAuth, getUsersRecent);
router.get("/usersregisterrecent", checkAuth, getUsersRegisterRecent);
router.post("/changestate", checkAuth, ChangeState);
router.post("/sendWarning", sendWarning);

router.get("/searchPatients", searchPatients)
router.get("/searchSpecialists", searchSpecialists)

router.post("/sendTest", sendTest)

router.post("/deletePatient", checkAuth, deletePatientsExcept)

export default router;
