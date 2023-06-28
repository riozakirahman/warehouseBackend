import express from "express";
import {
  getProductUnit,
  createProductUnit,
  deleteProductUnit,
  updateProductUnit,
  getProductUnitById,
} from "../../controller/product/productUnitController.js";

const productUnitRouter = express.Router();

productUnitRouter.get("/", getProductUnit);
productUnitRouter.get("/:id", getProductUnitById);
productUnitRouter.post("/", createProductUnit);
productUnitRouter.put("/:id", updateProductUnit);
productUnitRouter.delete("/:id", deleteProductUnit);

export default productUnitRouter;
