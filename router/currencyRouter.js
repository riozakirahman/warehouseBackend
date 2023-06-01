import express from "express";
import {
  createCurrency,
  getCurrency,
} from "../controller/currencyController.js";

const router = express.Router();

router.post("/", createCurrency);
router.get("/", getCurrency);

export default router;
