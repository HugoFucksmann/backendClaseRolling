const express = require("express");
const cors = require("cors");
const uid = require("uid");
const path = require("path");
const PORT = 3012;

const app = express();
app.use(cors());
app.use(express.json());
//-----------------------------------
//metodos: GET PUT/PATCH POST DELETE
let id = 2;
let productos = [
  {
    id: 1,
    name: "notebook",
    price: 20000,
  },
];

// request response
app.get("/consolelog", (req, res) => {
  console.log("Alguien abro el localhost:3012/consolelog");
  res.send("vos abriste el localhost:3012/consolelog");
});

app.get("/consolelog2", (req, res) => {
  console.log("Hola Mundo");
  try {
    //codigo cualquiera
    //g;
    //  console.log(req.params);
    res.json({
      ok: true,
      msj: "estas en el /consolelog2",
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msj: "hubo un error",
    });
  }
});

app.get("/productos", (req, res) => {
  try {
    res.json({
      ok: true,
      productos: productos,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msj: "hubo un error",
    });
  }
});

app.post("/productos", (req, res) => {
  try {
    const nuevoProducto = req.body;
    nuevoProducto.id = id;
    id++;
    productos.push(nuevoProducto);

    console.log("productos POST: ", productos);
    res.json({
      ok: true,
      msj: "se agrego el producto con exito",
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msj: "ocurrio un error al cargar el producto",
    });
  }
});

app.delete("/productos/:idproductos", (req, res) => {
  try {
    const params = req.params;
    const idproductos = parseInt(params.idproductos);

    const exist = productos.find((producto) => producto.id === idproductos);
    if (!exist) {
      res.json({
        ok: false,
        msj: "no existe producto con ese id",
      });
    } else {
      productos = productos.filter((producto) => producto.id !== idproductos);
      console.log("productos DELETE: ", productos);

      res.json({
        ok: true,
        msj: "se elimino con exito",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msj: "no se pudo eliminar producto, hubo un error",
    });
  }
});

/* let productonuevo = {
    name: "lampara",
    price: 300
}

fetch("/productos", {
    method: "POST",
    body: productonuevo
})
 */
//-------------------------
app.listen(PORT, () => {
  console.log("server iniciado en puert: ", PORT);
});
