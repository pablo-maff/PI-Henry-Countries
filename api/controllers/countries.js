const countriesRouter = require("express").Router()
const axios = require("axios");
const { info } = require('../utils/logger')
const { Activity, Country } = require("../models");
const { Op } = require("sequelize");

info(axios.get("https://restcountries.com/v3/all"))

// GET /countries:
// En una primera instancia deberán traer todos los países desde la API restcountries y guardarlos en su propia base de datos con todos los campos de la tabla countries
// De esta ruta se debería obtener un listado de los paises.

countriesRouter.get("/countries", async (req, res) => {
  const { name } = req.query; // en la ruta se puede llegar a recibir un valor de búsqueda de pais por nombre
  const dbCountries = await Country.findAll();
  
  try {
    // Se guarda en una variable la consulta a la api de todos los paises
    
    const allCountries = await axios.get("https://restcountries.com/v3/all");
    // se traen los datos de la API a la DB solo si está vacía la tabla paises
    !dbCountries.length &&
    (await Country.bulkCreate(
      allCountries.data.map((c) => {
        // se accede a la propiedad data donde se encuentra el array de objetos
        // con la info de los paises, y se mapea para añadir cada uno a la tabla countries
        return {
          id: c.cca3,
          name: c.name.common.toLowerCase(),
          flags: c.flags[0],
          continents: c.continents,
          capital: c.capital || ["No tiene capital"], // se pone un valor por defecto si el pais no tiene capitales
          subregion: c.subregion || 'No tiene subregion',
          area: Number(c.area),
          population: Number(c.population),
        };
      })
      ));
      
      let result = name // si llega un valor por query se filtran paises por nombre
      ? await Country.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`, // se filtran los paises que contengan el string que llega por query
          },
        },
        include: [
          {
            model: Activity,
            attributes: ["name"], // se relacionan las actividades de cada país
            through: {
                attributes: [],
              },
            },
          ],
        }) // si no hay query se traen todos los paises
        : await Country.findAll({
          include: [
            {
              model: Activity,
              attributes: ['name'], // se relacionan las actividades de cada país
              through: {
                attributes: [],
              },
            },
          ],
        });
        res.status(200).json(
      result.map((c) => {
        return {
          id: c.id,
          name: c.name,
          flags: c.flags,
          continents: c.continents,
          subregion: c.subregion,
          area: c.area,
          population: c.population,

          // la base de datos trae las actividades como un array de objetos
          // donde cada uno tiene la propiedad name
          // la cual se mapea para convertirla en un array de strings

          activities: c.activities.map((a) => a.name),
        };
      })
    );
  } catch (error) {
    // si hay error en la consulta se muestra un mensaje
    res.json({ error: "No hay resultados para esta busqueda" });
  }
});

// GET /countries/{idPais}:
// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes

countriesRouter.get("/countries/:id", async (req, res) => {
  //se consulta en la base de datos el pais con la PK que llega por params
  const country = await Country.findByPk(req.params.id, {
    include: [{
      model: Activity,
      attributes: { exclude: ['id'] },
      through: {
        attributes: []
      }
    }]
  })

  if (!country) return res.status(404).json({ error: 'El id ingresado no es válido'})

  res.json(country)
});

module.exports = countriesRouter;
