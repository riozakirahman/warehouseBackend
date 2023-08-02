import express from "express";
import {
  createTransfer,
  deleteTransfer,
  getTransfer,
  getTransferById,
  updateTransfer,
  updateTransferStatus,
} from "../../controller/transfer/transferController.js";

const transferRouter = express.Router();

transferRouter.get("/", getTransfer);
transferRouter.put("/status/:id", updateTransferStatus);
transferRouter.get("/:id", getTransferById);
transferRouter.post("/", createTransfer);
transferRouter.put("/:id", updateTransfer);
transferRouter.delete("/:id", deleteTransfer);

export default transferRouter;
