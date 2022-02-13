const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('countries', {
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
    })
    await queryInterface.createTable('activities', {
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
    }, {
        uniqueKeys: {
          activities_unique: {
            fields: ['name', 'difficulty', 'duration', 'season']
          }
        }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('countries')
    await queryInterface.dropTable('activities')
  },
}