const { Router } = require("express");
const {
  getProductos,
  postProductos,
  putProductos,
  deleteProductos,
} = require("../controllers/productos");
const { verificarJWT } = require("../utils/jwt");

/* 
path: api/productos
*/

const router = Router();

router.get("/", getProductos);

router.post("/", verificarJWT, postProductos);

router.put("/:idProducto", verificarJWT, putProductos);

router.delete("/:idProducto", verificarJWT, deleteProductos);

module.exports = router;
