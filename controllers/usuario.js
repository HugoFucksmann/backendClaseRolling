const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../utils/jwt");
const { validationResult } = require("express-validator");

const loginUsuario = async (req, res) => {
  const { user, password } = req.body;
  try {
    const usuarioDB = await Usuario.findOne({ user });

    if (!usuarioDB) {
      return res.status(500).json({
        ok: false,
        msj: "usuario no encontrado",
      });
    }
    const validarPassword = await bcrypt.compare(password, usuarioDB.password);

    if (!validarPassword) {
      return res.json({
        ok: false,
        msj: "contraseña incorrecta",
      });
    }

    const userToken = await generarJWT(usuarioDB._id);

    res.json({
      ok: true,
      usuario: usuarioDB,
      token: userToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msj: "hubo un error",
    });
  }
};

const registrarUsuario = async (req, res) => {
  const errors = validationResult(req);
  const { user, password } = req.body;

  if (!errors.isEmpty()) {
    //analizar error para personalizar msj

    return res.status(400).json({
      ok: false,
      errors: errors.array(),
      msj: "usuario o contraseña incorrecta",
    });
  }
  try {
    const usuarioDB = await Usuario.findOne({ user });

    if (usuarioDB) {
      return res.json({
        ok: false,
        msj: "usuario ya registrado",
      });
    }

    const passwordEncrypt = await bcrypt.hash(password, 12);

    const newUser = new Usuario({
      user: user,
      password: passwordEncrypt,
    });
    newUser.save();

    res.json({
      ok: true,
      msj: "se creo usuario con exito",
      usuario: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msj: "hubo un error al crear usuario",
    });
  }
};

module.exports = {
  loginUsuario,
  registrarUsuario,
};
