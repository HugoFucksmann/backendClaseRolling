const Producto = require("../models/productos");

const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();

    res.json({
      ok: true,
      productos: productos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msj: "hubo un error",
    });
  }
};

const postProductos = async (req, res) => {
  try {
    const newProducto = new Producto({
      ...req.body,
    });

    const newProductoBBDD = await newProducto.save();

    res.json({
      ok: true,
      msj: "se agrego el producto con exito",
      newProducto: newProducto,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msj: "ocurrio un error al cargar el producto",
    });
  }
};

const putProductos = async (req, res) => {
  try {
    const idProducto = req.params.idProducto;
    const productoAEditar = req.body;

    const productoBD = await Producto.findById(idProducto);

    if (!productoBD) {
      return res.json({
        ok: false,
        msj: "producto no encontrado",
      });
    }

    const productoActualizado = await Producto.findByIdAndUpdate(
      { _id: idProducto },
      productoAEditar,
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      msj: "se edito con exito el producto",
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msj: "ocurrio un error al editar el producto",
    });
  }
};

const deleteProductos = async (req, res) => {
  try {
    const idProducto = req.params.idProducto;

    const productoBD = await Producto.findById(idProducto);

    if (!productoBD) {
      return res.status(404).json({
        ok: false,
        msj: "producto no encontrado",
      });
    }

    await Producto.findByIdAndDelete(idProducto);

    res.json({
      ok: true,
      msj: "se elimino producto con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
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
