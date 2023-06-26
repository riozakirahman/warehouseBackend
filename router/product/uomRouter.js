import express from "express";
import {
  getUom,
  createUom,
  updateUom,
  deleteUom,
  getUomById,
} from "../../controller/product/uomController.js";

const uomRouter = express.Router();

uomRouter.get("/", getUom);
uomRouter.get("/:id", getUomById);
uomRouter.post("/", createUom);
uomRouter.put("/:id", updateUom);
uomRouter.delete("/:id", deleteUom);

export default uomRouter;
