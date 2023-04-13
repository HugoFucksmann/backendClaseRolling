const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./bbddConection");

require("dotenv").config();

const PORT = 3012;

const app = express();
app.use(cors());
app.use(express.json());
dbConnection();

app.use("/api/productos", require("./routes/productos"));

app.listen(PORT, () => {
  console.log("server iniciado en puert: ", PORT);
});
