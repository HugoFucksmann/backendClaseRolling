const mongoose = require("mongoose");

const CarritoSchema = new mongoose.Schema(
  {
    productos: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
        },
        cantidad: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { collection: "carrito" }
);

CarritoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();

  return object;
});

module.exports = mongoose.model("Carrito", CarritoSchema);
