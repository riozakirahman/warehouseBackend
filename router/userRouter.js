import express from "express";
import {
  getUser,
  signIn,
  register,
  profile,
  logout,
} from "../controller/userController.js";

const router = express.Router();

router.get("/", getUser);
router.post("/", signIn);
router.post("/register", register);
router.get("/profile", profile);
router.post("/logout", logout);

export default router;
