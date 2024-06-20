import express from "express";
import dotenv from "dotenv";
import { engine } from "express-handlebars";

import productRouter from "./routes/products.js";
import cartRouter from "./routes/carts.js";
import * as service from "./services/product.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongodb } from "./config/db.js";
import { __dirnameApp } from "./pathUtil.js";

dotenv.config();

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirnameApp}/views`);

// Use routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.use(errorHandler);

initMongodb().catch(console.dir);

app.get("/products", async (req, res) => {
  const { page, limit, name, sort } = req.query;
  const response = await service.getAll(page, limit, name, sort);
  const data = {
    status: "success",
    payload: response.docs,
    totalPages: response.totalDocs,
    prevPage: response.prevPage,
    nextPage: response.nextPage,
    page: response.page,
    hasNextPage: response.hasNextPage,
    hasPrevPage: response.hasPrevPage,
    prevLink: response.prevLink,
    nextLink: response.nextLink,
  };
  // console.log('==data==', data);
  res.render("index", data);
});

const server = app.listen(PORT, () => {
  console.log(`Server listing at http://localhost:${PORT}`);
});

server.on("error", (err) => console.log(err));
