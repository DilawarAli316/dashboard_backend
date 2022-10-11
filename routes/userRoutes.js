import express from "express";

const router = express.Router();
import {
  loginUser,
  recoverPassword,
  registerUser,
  resetPassword,
  updateUserProfile,
  verifyCode,
} from "../controller/authController.js";
import {
  getUserProfile,
  getUsers,
  logs,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(getUsers);
router.route("/profile").get(protect, getUserProfile);
router.route("/logs").get(logs);
export default router;
