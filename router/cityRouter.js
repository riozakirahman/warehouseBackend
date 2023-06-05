import express from "express";
import { createCity, getCity } from "../controller/cityController.js";

const router = express.Router();

router.get("/", getCity);
router.post("/", createCity);

export default router;
