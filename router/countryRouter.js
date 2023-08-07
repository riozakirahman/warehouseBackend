import express from "express";
import {
  getCountry,
  createCountry,
  getCountryById,
  updateCountry,
  deleteCountry,
} from "../controller/countryController.js";

const router = express.Router();

router.get("/", getCountry);
router.get("/:id", getCountryById);
router.put("/:id", updateCountry);
router.delete("/:id", deleteCountry);
router.post("/", createCountry);

export default router;
