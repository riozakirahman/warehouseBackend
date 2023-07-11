import express from "express";
import {
  createStock,
  deleteStock,
  getStock,
  getStockkById,
  updateStock,
} from "../../controller/stock/stockController.js";

const stockRouter = express.Router();

// router.post("/", createCompany);
stockRouter.get("/", getStock);
stockRouter.get("/:id", getStockkById);
stockRouter.post("/", createStock);
stockRouter.put("/:id", updateStock);
stockRouter.delete("/:id", deleteStock);

export default stockRouter;
