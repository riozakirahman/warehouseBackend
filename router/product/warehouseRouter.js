import express from "express";
import {
  getWarehouse,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from "../../controller/warehouseController.js";

const warehouseRouter = express.Router();

warehouseRouter.get("/", getWarehouse);
warehouseRouter.get("/:id", getWarehouseById);
warehouseRouter.post("/", createWarehouse);
warehouseRouter.put("/:id", updateWarehouse);
warehouseRouter.delete("/:id", deleteWarehouse);

export default warehouseRouter;
