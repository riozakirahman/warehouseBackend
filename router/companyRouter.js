import express from "express";
import { createCompany, getCompany } from "../controller/companyController.js";

const router = express.Router();

router.post("/", createCompany);
router.get("/", getCompany);

export default router;
