import express from "express";
import userRouter from "../backend/router/userRouter.js";
import currencyRouter from "../backend/router/currencyRouter.js";
import companyRouter from "../backend/router/companyRouter.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  res.json("hello from the backend");
});
app.use("/api/users", userRouter);
app.use("/api/currency", currencyRouter);
app.use("/api/company", companyRouter);

app.listen(process.env.PORT, () => {
  console.log("run on http://localhost:4000");
});
