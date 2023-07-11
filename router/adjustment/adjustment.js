import express from "express";
import {
  getAdj,
  getAdjById,
  createAdj,
  updateAdj,
  deleteAdj,
} from "../../controller/adjustment/adjustmentController.js";
const adjRouter = express.Router();

adjRouter.get("/", getAdj);
adjRouter.get("/:id", getAdjById);
adjRouter.post("/", createAdj);
adjRouter.put("/:id", updateAdj);
adjRouter.delete("/:id", deleteAdj);

export default adjRouter;
