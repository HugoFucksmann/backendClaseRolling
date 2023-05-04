const mongoose = require("mongoose");

// aws s3 buckets

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
    img: {
      type: String,
      default: "",
    },
  },
  { collection: "usuarios" }
);

UsuarioSchema.method("toJSON", function () {
  const { __v, password, ...object } = this.toObject();

  return object;
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
