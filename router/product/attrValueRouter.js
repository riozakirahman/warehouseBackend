import express from "express";
import {
  getAttributeValue,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
  getAttributeValueById,
} from "../../controller/product/attrValController.js";

const attrValueRouter = express.Router();

attrValueRouter.get("/", getAttributeValue);
attrValueRouter.get("/:id", getAttributeValueById);
attrValueRouter.post("/", createAttributeValue);
attrValueRouter.put("/:id", updateAttributeValue);
attrValueRouter.delete("/:id", deleteAttributeValue);

export default attrValueRouter;
