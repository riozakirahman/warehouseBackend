import express from "express";
import userRouter from "../backend/router/userRouter.js";
import currencyRouter from "../backend/router/currencyRouter.js";
import companyRouter from "../backend/router/companyRouter.js";
import countryRouter from "../backend/router/countryRouter.js";
import provinceRouter from "../backend/router/provinceRouter.js";
import cityRouter from "../backend/router/cityRouter.js";
import attributeRouter from "../backend/router/product/attributeRouter.js";
import attrValueRouter from "./router/product/attrValueRouter.js";
import productAttributeRouter from "./router/product/productAttrRouter.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import uomRouter from "./router/product/uomRouter.js";
import productRouter from "./router/product/productRouter.js";
import productUnitRouter from "./router/product/productUnitRouter.js";
import warehouseRouter from "./router/product/warehouseRouter.js";

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
app.use("/api/country", countryRouter);
app.use("/api/province", provinceRouter);
app.use("/api/city", cityRouter);
app.use("/api/attribute", attributeRouter);
app.use("/api/attributevalue", attrValueRouter);
app.use("/api/productattr", productAttributeRouter);
app.use("/api/uom", uomRouter);
app.use("/api/product", productRouter);
app.use("/api/productunit", productUnitRouter);
app.use("/api/warehouse", warehouseRouter);

app.listen(process.env.PORT, () => {
  console.log("run on http://localhost:4000");
});
