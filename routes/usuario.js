const { Router } = require("express");
const { loginUsuario, registrarUsuario } = require("../controllers/usuario");
const { body } = require("express-validator");

/* 
path: api/usuario
*/

const router = Router();

router.post("/login", loginUsuario);
router.post(
  "/",
  [body("user").isEmail(), body("password").isLength({ min: 8 })],
  registrarUsuario
);

module.exports = router;
