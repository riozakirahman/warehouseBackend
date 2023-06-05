import express from "express";
import {
  createProvince,
  getProvince,
} from "../controller/provinceController.js";

const router = express.Router();

router.get("/", getProvince);
router.post("/", createProvince);

export default router;
