import { useState, useEffect, useRef } from "react";
import Country from "../countries/Country";
import styled from "styled-components";
import { getAllCountries, putPage } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { filterByContinent, filterBySort, matchByActivities } from "./filters";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/*
Requerimiento del readme:
Ruta principal: debe contener
[x] Área donde se verá el listado de países. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /countries y deberá mostrar su:
Imagen de la bandera
Nombre 
Continente 
[x] Paginado para ir buscando y mostrando los siguientes paises, 10 paises por pagina.
*/

const Countries = styled.div`
   {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-bottom: 50px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  & .country {
    width: 18%;
    margin: 0 1%;
    overflow: hidden;
  }
`;
const Pagination = styled.div`
  width: 80%;
  margin: 20px 10%;
  display: flex;
  margin-bottom: 10px;

  & button {
    color: #888;
    border: #fff;
    background: transparent;
    font-size: 1.6rem;
  }
  & button:hover {
    font-size: 1.7rem;
    color: #448;
  }
  & ul {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
  }
  & li {
    color: #999;
    padding: 0 5px;
    list-style: none;
  }
  & li:hover {
    color: #448;
    font-weight: bold;
  }
  & a {
    color: #999;
  }
`;

const Index = ({ continent, activity, sort, search }) => {
                let page = useSelector((store) => store.page);
  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(getAllCountries(search));
  }, [dispatch, search]);

  let allCountries = useSelector((store) => store.allCountries);

  // se importan las funciones de un archivo que contiene la lógica para cada tipo de filtrado
  // y se invoca una dentro de otra para que los filtros se ejecuten en simultáneo
  allCountries = matchByActivities(
    filterByContinent(filterBySort(allCountries, sort), continent),
    activity
  );
  return (
    <>
      <Pagination>
      {/*   [x] Paginado para ir buscando y
      mostrando 10 paises por pagina. */}
      
        <>
          {page > 9 && (
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => {
                dispatch(putPage(page - 10))}}
            />
          )}
        </>


        <>
          {page < allCountries.length + 1 && (
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={() => dispatch(putPage(page + 10))}
            />
          )}
        </>
      </Pagination>


      <Countries>
      {/* [x] Área donde se verá el listado de países. Al iniciar deberá cargar los primeros
      resultados obtenidos desde la ruta GET /countries y deberá mostrar su:
      Imagen de la bandera Nombre Continente  */}
        {allCountries.length ? (
          allCountries.map((c, i) => {
            console.log('Country.Page=', page);
            return (
              i >= page - 10 &&
              i < page && (
                <Country
                  Image={c.flags}
                  Name={c.name}
                  Continent={c.continents.join(", ")}
                  id={c.id}
                />
              )
            );
          })
        ) : search.length ? (
          <div>Countries not founded</div>
        ) : (
          <div>loading countries...</div>
        )}
      </Countries>
    </>
  );
            };

export default Index;
