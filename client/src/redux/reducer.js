import { ALLCOUNTRIES, COUNTRYBYPK, ALLACTIVITIES, PAGE } from "./actionTypes";

const initialState = {
  allCountries: [], // se guardan los paises de la base de datos
  countryByPk: {}, // se guarda un país consultado por PK
  allActivities: [], // se guardan las actividades de la base de datos
  page: 9, // es el ínidice del elemento hasta donde se renderiza en el home
  // para mantener el mismo paginado aunque se navegue en otros componentes
};

const Reducer = (store = initialState, action) => {
  switch (action.type) {
    case ALLCOUNTRIES:
      return { ...store, allCountries: action.payload };
    case COUNTRYBYPK:
      return { ...store, countryByPk: action.payload };
    case ALLACTIVITIES:
      return { ...store, allActivities: action.payload };
    case PAGE:
      return { ...store, page: action.payload };
    default:
      return store;
  }
};

export default Reducer;
