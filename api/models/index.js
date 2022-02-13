const Country = require('./country')
const Activity = require('./activity')
const Membership = require('./membership')

Country.belongsToMany(Activity, { through: Membership });
Activity.belongsToMany(Country, { through: Membership });


module.exports = {
  Country,
  Activity,
  Membership
}