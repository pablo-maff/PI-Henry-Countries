import axios from "axios"
import {ALLCOUNTRIES,
        COUNTRYBYPK,
        ALLACTIVITIES,
        PAGE} from "./actionTypes"

// esta acción trae por de la tabla Países un array de objetos
// con información de cada uno de los países del mundo
// la consulta puede recibir un query que filtra aquellos países
// que tengan en su propiedad name el valor enviado por query
// de lo contrario se traen todos los países
export const getAllCountries = (name) => async (dispatch) => 
name ?
axios.get(`http://localhost:3001/countries?name=${name}`)
.then(res => dispatch({type:ALLCOUNTRIES, payload: res.data}))
.catch(err => dispatch({type:ALLCOUNTRIES, payload: []}))
:
axios.get(`http://localhost:3001/countries`)
.then(res => dispatch({type:ALLCOUNTRIES, payload: res.data}))
.catch(err => dispatch({type:ALLCOUNTRIES, payload: []}))

// hace un get a la ruta que consulta por PK un único país

export const getCountryByPk = (id) => async (dispatch) => 
axios.get(`http://localhost:3001/countries/${id}`)
.then(res => dispatch({type:COUNTRYBYPK, payload: res.data}))
.catch(err => dispatch({type:COUNTRYBYPK, payload: {}}))

// Trae de la tabla actividades, el nombre de todas las existentes
// en un array de strings

export const getAllActivities = () => async (dispatch) => 
axios.get(`http://localhost:3001/activities`)
.then(res => dispatch({type:ALLACTIVITIES, payload: res.data}))
.catch(err => dispatch({type:ALLACTIVITIES, payload: []}))

// guarda un nuevo registro en la tabla de actividades

export const postActivity = async (payload) => {
        return axios.post('http://localhost:3001/activity', payload)
       .then(function (response) {})
       .catch(function (error) {});
     };

// guarda en el Store el número de la paginación
// para mantener guardado su valor aunque el usuario
//navegue entre distintos componentes
     
export const putPage = (payload) => async (dispatch) =>  dispatch({type:PAGE, payload})