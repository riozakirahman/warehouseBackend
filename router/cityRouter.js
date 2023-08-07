import express from "express";
import {
  createCity,
  deleteCity,
  getCity,
  getCityById,
  updateCity,
} from "../controller/cityController.js";

const router = express.Router();

router.get("/", getCity);
router.get("/:id", getCityById);
router.put("/:id", updateCity);
router.delete("/:id", deleteCity);
router.post("/", createCity);

export default router;
