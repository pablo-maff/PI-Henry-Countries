const { Model, DataTypes } = require("sequelize");
const { sequelize } = require('../utils/db')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// Actividad Turística con las siguientes propiedades:
// ID
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)

class Activity extends Model {}

Activity.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[\p{Script=Latin}\s]{2,254}$/u
        }
      },
      difficulty: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5
        }
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      season: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    { 
      sequelize,
      underscored: true,
      timestamps: false,
      modelName: 'activity',
      indexes: [
        {
          unique:true,
          fields: ['name', 'difficulty', 'duration', 'season']
        }
      ]
})

module.exports = Activity