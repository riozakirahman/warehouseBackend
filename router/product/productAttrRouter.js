import express from "express";
import {
  getProductAttr,
  createProductAttr,
  updateProductAttr,
  deleteProductAttr,
  getProductAttrById,
} from "../../controller/product/productAttrController.js";

const productAttributeRouter = express.Router();

productAttributeRouter.get("/", getProductAttr);
productAttributeRouter.get("/:id", getProductAttrById);
productAttributeRouter.post("/", createProductAttr);
productAttributeRouter.put("/:id", updateProductAttr);
productAttributeRouter.delete("/:id", deleteProductAttr);

export default productAttributeRouter;
