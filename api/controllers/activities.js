const activitiesRouter = require("express").Router()
const axios = require("axios")
const {Country, Activity, Membership} = require("../models")

// [ ] POST /activity:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos

activitiesRouter.post("/activity", async (req, res) => {
    try {
        const { name, country} = req.body
        const activity = await Activity.create(req.body)

        await Membership.create({
          countryId: country, 
          activityId: activity.id
        })

        res.status(200).send(`La actividad ${name} ha sido creada y relacionada a ${country}`)
      } catch(error) {
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
