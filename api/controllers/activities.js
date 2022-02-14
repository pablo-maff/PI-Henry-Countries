const activitiesRouter = require("express").Router()
const axios = require("axios")
const {Country, Activity, Membership} = require("../models")
const { sequelize } = require('../utils/db')

// [ ] POST /activity:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos

activitiesRouter.post("/activity", async (req, res) => {
    try {
        const { name, countries} = req.body
        const activity = await Activity.create(req.body)

        for (const country of countries) {
          const countryObj = await Country.findOne({ 
            where: { name: country }
          })
          Membership.create({
            countryId: countryObj.id,
            activityId: activity.id
          })
        }
        res.status(200).send(`La actividad ${name} ha sido creada y relacionada a paises`)
      } catch(error) {
          console.log(error);
          return res.status(400).json({ error: "Los datos enviados no son válidos" })
      }
    }) 

activitiesRouter.get("/activities", async (req,res) => {
    // este request trae todas las actividades creadas por los usuarios
    // para que en el fontend se actualice en los filtros
    try {
        const allActivities = await Activity.findAll()
        
        // solo se envía un array de strings de los nombres
        res.json(allActivities.map(a => a.name)) 

    } catch (err){
        res.json({ error:"No se pudo consultar o encontrar actividades"} )
    }
})


module.exports = activitiesRouter;
