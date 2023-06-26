import express from "express";
import {
  getAttribute,
  createAttribute,
  updateAttribute,
  deleteAttribute,
  getAttributeById,
} from "../../controller/product/attributeController.js";

const attributeRouter = express.Router();

attributeRouter.get("/", getAttribute);
attributeRouter.get("/:id", getAttributeById);
attributeRouter.post("/", createAttribute);
attributeRouter.put("/:id", updateAttribute);
attributeRouter.delete("/:id", deleteAttribute);

export default attributeRouter;
