const indexRouter = require('express').Router()
const Activities = require("./activities");
const Countries = require("./countries");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

indexRouter.use("/", Activities)
indexRouter.use("/", Countries)

module.exports = indexRouter;
