const { Router } = require("express");
const {
  getCarrito,
  getOneCarrito,
  postItemCarrito,
  putItemCarrito,
  deleteItemCarrito,
} = require("../controllers/carrito");
const { verificarJWT } = require("../utils/jwt");

/* 
path: api/carrito
*/

const router = Router();

router.get("/", verificarJWT, getCarrito);

router.get("/:carritoId", verificarJWT, getOneCarrito);

router.post("/", verificarJWT, postItemCarrito);

router.put("/:carritoId/:productoId", verificarJWT, putItemCarrito);

router.delete("/:carritoId", verificarJWT, deleteItemCarrito);

module.exports = router;
