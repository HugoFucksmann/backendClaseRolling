const mongoose = require("mongoose");

const ProductosSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      default: "",
    },
  },
  { collection: "productos" }
);

ProductosSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();

  return object;
});

module.exports = mongoose.model("Producto", ProductosSchema);
