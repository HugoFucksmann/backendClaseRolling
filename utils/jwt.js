const jwt = require("jsonwebtoken");
const { resolve } = require("path");

const generarJWT = async (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("no se pudo generar token");
        } else resolve(token);
      }
    );
  });
};

const verificarJWT = (req, res, next) => {
  const token = req.header("x-token");

  try {
    if (!token) {
      return res.status(401).json({
        ok: false,
        msj: "no hay token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      next();
    } else {
      return res.status(401).json({
        ok: false,
        msj: "token no valido",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msj: "ocurrio un error al verificar token",
    });
  }
};

module.exports = {
  generarJWT,
  verificarJWT,
};
