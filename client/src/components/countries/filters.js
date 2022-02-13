// countries recibe por props continent, activities y sort,
// los cuales serán pasados como parámetros a estas funciones
// según sea el caso, las cuales van a filtrar de todos los
// países aquellos que contengan el valor de determinado tipo de filtro.

export const filterByContinent = (countries, continent) =>
  continent.length
    ? countries.filter((country) => country.continents.includes(continent))
    : countries;

export const filterBySort = (countries, sort) => {
  switch (sort) {
    case "A-z":
      return countries.sort((a, b) => (a.name >= b.name ? 1 : -1));
    case "Z-a":
      return countries.sort((a, b) => (a.name >= b.name ? -1 : 1));
    case "Mas poblados":
      return countries.sort((a, b) => (a.population >= b.population ? -1 : 1));
    case "Menos poblados":
      return countries.sort((a, b) => (a.population >= b.population ? 1 : -1));

    default:
      return countries;
  }
};

export const matchByActivities = (countries, activity) =>
  activity.length
    ? countries.filter((country) => country.activities.includes(activity))
    : countries;
