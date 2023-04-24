const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { collection: "usuarios" }
);

UsuarioSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();

  return object;
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
