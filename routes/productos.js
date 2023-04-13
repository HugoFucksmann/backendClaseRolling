const { Router } = require("express");
const {
  getProductos,
  postProductos,
  putProductos,
  deleteProductos,
} = require("../controllers/productos");

/* 
path: api/productos
*/

const router = Router();

router.get("/", getProductos);

router.post("/", postProductos);

router.put("/:idProducto", putProductos);

router.delete("/:idProducto", deleteProductos);

module.exports = router;
