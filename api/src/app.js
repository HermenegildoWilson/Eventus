const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);

app.use("/v1.26.04", routes);

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada." });
});

app.use(errorHandler);

module.exports = app;
