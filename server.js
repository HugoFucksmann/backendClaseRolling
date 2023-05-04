const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { dbConnection } = require("./bbddConection");
const PORT = 3012;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

dbConnection();

app.use("/api/productos", require("./routes/productos"));
app.use("/api/carrito", require("./routes/carrito"));
app.use("/api/usuario", require("./routes/usuario"));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log("server iniciado en puert: ", PORT);
});
