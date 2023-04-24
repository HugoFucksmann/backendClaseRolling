const mongoose = require("mongoose");

const CategoriaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
      },
    ],
  },
  { collection: "categoria" }
);

CategoriaSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();

  return object;
});

module.exports = mongoose.model("Producto", CategoriaSchema);
