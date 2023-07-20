import express from "express";
import {
  getPO,
  createPO,
  updatePO,
  deletePO,
  getPOById,
  getPOWaiting,
  updateStatus,
} from "../../controller/po/poController.js";
const poRouter = express.Router();

poRouter.get("/", getPO);
poRouter.get("/waiting", getPOWaiting);
poRouter.get("/:id", getPOById);
poRouter.post("/", createPO);
poRouter.put("/:id", updatePO);
poRouter.put("/status/:id", updateStatus);
poRouter.delete("/:id", deletePO);

export default poRouter;
