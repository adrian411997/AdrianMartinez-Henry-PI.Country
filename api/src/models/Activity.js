const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "activity",
    {
      name: {
        type: DataTypes.STRING,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        validate: {
          max: 5,
          min: 1,
        },
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      season: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
