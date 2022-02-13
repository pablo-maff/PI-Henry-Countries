const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('memberships', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      country_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: 'countries', key: 'id' },
      },
      activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'activities', key: 'id' },
      },
    }, {
      uniqueKeys: {
        membership_unique: {
          fields: ['country_id', 'activity_id']
          }
        }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('memberships')
  },
}