import express from "express";
import {
  createProvince,
  deleteProvince,
  getProvince,
  getProvinceById,
  updateProvince,
} from "../controller/provinceController.js";

const router = express.Router();

router.get("/", getProvince);
router.get("/:id", getProvinceById);
router.put("/:id", updateProvince);
router.post("/", createProvince);
router.delete("/:id", deleteProvince);

export default router;
