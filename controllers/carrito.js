const Carrito = require("../models/carrito");

const getCarrito = async (req, res) => {
  try {
    const carritoDB = await Carrito.find();

    res.json({
      ok: true,
      carrito: carritoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msj: "hubo un error",
    });
  }
};

const getOneCarrito = async (req, res) => {
  const idCarrito = req.params.carritoId;

  try {
    const carritoDB = await Carrito.findById(carritoId);

    res.json({
      ok: true,
      carrito: carritoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msj: "hubo un error",
    });
  }
};

const postItemCarrito = async (req, res) => {
  try {
    const newCarrito = new Carrito({
      ...req.body,
    });

    const newCarritoBBDD = await newCarrito.save();
    console.log("newCarritoBBDD ", newCarritoBBDD);
    res.json({
      ok: true,
      msj: "se actualizo el carrito",
      newCarrito: newCarritoBBDD,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msj: "ocurrio un error al cargar el producto",
    });
  }
};

const putItemCarrito = async (req, res) => {
  try {
    const carritoId = req.params.carritoId;
    const productoId = req.params.productoId;
    const cantidad = req.body.cantidad || 1;

    const carritoBD = await Carrito.findById({ _id: carritoId });
    if (!carritoBD) {
      return res.json({
        ok: false,
        msj: "carrito no encontrado",
      });
    }
    const existeProd = carritoBD.productos.find(
      (obj) => obj.producto.toString() === productoId
    );

    if (existeProd) {
      await Carrito.findOneAndUpdate(
        { _id: carritoId },
        {
          $set: {
            productos: {
              producto: productoId,
              cantidad: existeProd.cantidad + cantidad,
            },
          },
        }
      );
    } else {
      await Carrito.findOneAndUpdate(
        { _id: carritoId },
        {
          $push: {
            productos: {
              producto: productoId,
              cantidad: cantidad,
            },
          },
        }
      );
    }

    res.json({
      ok: true,
      msj: "se edito con exito el carrito",
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msj: "ocurrio un error al editar el producto",
    });
  }
};

const deleteItemCarrito = async (req, res) => {
  try {
    const idCarrito = req.params.idCarrito;

    const carritoBD = await Carrito.findById(idCarrito);

    if (!carritoBD) {
      return res.status(404).json({
        ok: false,
        msj: "carrito no encontrado",
      });
    }

    await Carrito.findByIdAndDelete(idCarrito);

    res.json({
      ok: true,
      msj: "se elimino carrito con exito",
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
  getCarrito,
  getOneCarrito,
  postItemCarrito,
  putItemCarrito,
  deleteItemCarrito,
};
