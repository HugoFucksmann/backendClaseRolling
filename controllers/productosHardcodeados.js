let id = 2;
let productos = [
  {
    id: 1,
    name: "notebook",
    price: 20000,
  },
];

const getProductos = (req, res) => {
  console.log("getProductos");
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
};

const postProductos = (req, res) => {
  try {
    const nuevoProducto = req.body;
    nuevoProducto.id = id;
    id++;
    productos.push(nuevoProducto);

    res.json({
      ok: true,
      msj: "se agrego el producto con exito",
      productos: productos,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msj: "ocurrio un error al cargar el producto",
    });
  }
};

const putProductos = (req, res) => {
  const idProducto = parseInt(req.params.idProducto);
  const nuevoProducto = req.body;

  productos[0].price = nuevoProducto.price;

  res.json({
    ok: true,
    msj: "se edito con exito el producto",
    productos: productos,
  });
};

const deleteProductos = (req, res) => {
  try {
    const idProducto = parseInt(req.params.idProducto);
    const exist = productos.find((producto) => producto.id === idProducto);
    if (exist) {
      productos = productos.filter((producto) => producto.id !== idProducto);
      console.log("productos ", productos);
      res.json({
        ok: true,
        msj: "se elimino producto con exito",
        productos: productos,
      });
    } else {
      res.json({
        ok: false,
        msj: "no existe producto en la bbdd",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msj: "hubo un error al eliminar producto",
    });
  }
};

module.exports = {
  getProductos,
  postProductos,
  putProductos,
  deleteProductos,
};
