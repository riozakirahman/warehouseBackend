import express from "express";
import {
  createCurrency,
  deleteCurrency,
  getCurrency,
  getCurrencyById,
  updateCurrency,
} from "../controller/currencyController.js";

const router = express.Router();

router.post("/", createCurrency);
router.get("/", getCurrency);
router.get("/:id", getCurrencyById);
router.put("/:id", updateCurrency);
router.delete("/:id", deleteCurrency);

export default router;
