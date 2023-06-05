import express from "express";
import { getCountry, createCountry } from "../controller/countryController.js";

const router = express.Router();

router.get("/", getCountry);
router.post("/", createCountry);

export default router;
