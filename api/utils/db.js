require('dotenv').config();
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug')
const { info, error } = require('./logger')
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = require ('./config')

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/new_countries`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async() => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()

  info('Migrations up to date', {
    files: migrations.map(mig => mig.name),
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    info('database connected')
  } catch (err) {
    error('connecting database failed', err)
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize, rollbackMigration }