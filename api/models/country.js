const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// Cada país tiene las siguientes propiedades:
// ID (Código de 3 letras) *
// Nombre *
// Imagen de la bandera *
// Continente *
// Capital *
// Subregión
// Área
// Población

class Country extends Model {}

Country.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continents: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    capital: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.INTEGER,
    },
    population: {
      type: DataTypes.INTEGER,
    },
  },{
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'country',
    charset: 'utf8',
    collate: 'utf8_general_ci',
})

module.exports = Country