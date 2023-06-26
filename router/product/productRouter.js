import express from "express";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../../controller/product/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProduct);
productRouter.get("/:id", getProductById);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
