import express from "express";
import {
  createVendor,
  deleteVendor,
  getVendor,
  getVendorById,
  updateVendor,
} from "../../controller/vendor/vendorController.js";

const vendorRouter = express.Router();

// router.post("/", createCompany);
vendorRouter.get("/", getVendor);
vendorRouter.get("/:id", getVendorById);
vendorRouter.post("/", createVendor);
vendorRouter.put("/:id", updateVendor);
vendorRouter.delete("/:id", deleteVendor);

export default vendorRouter;
