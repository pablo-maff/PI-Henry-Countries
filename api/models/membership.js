const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Membership extends Model {}

Membership.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  countryId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: 'countries', key: 'id' },
  },
  activityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'activities', key: 'id' },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'membership',
  indexes: [
    {
      unique:true,
      fields: ['countryId', 'activityId']
    }
  ]
})

module.exports = Membership