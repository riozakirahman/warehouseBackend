import express from "express";
import {
  createCompany,
  deleteCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} from "../controller/companyController.js";

const router = express.Router();

router.post("/", createCompany);
router.get("/", getCompany);
router.get("/:id", getCompanyById);
router.delete("/:id", deleteCompany);
router.put("/:id", updateCompany);

export default router;
