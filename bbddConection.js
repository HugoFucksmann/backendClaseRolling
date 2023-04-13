const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose
      .connect(process.env.BD_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("se conecto bbdd"));
  } catch (error) {
    console.log(error);
    throw Error("error a la hora de iniciar la bbdd");
  }
};

module.exports = {
  dbConnection,
};
