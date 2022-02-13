import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SphereShadows from "../../img/shadows-sphere.jpg";
import SphereLigth from "../../img/ligths-sphere.jpg";
import { useLocation } from "react-router-dom";

const Country = ({ Image, Name, Continent, Region, id }) => {
  // Cada país es una tarjeta que renderiza los siguientes datos
  // Imagen de la bandera
  // Nombre
  // Continente
  const location = useLocation();
  let prueba = 100;
  const Country = styled.div`
    & div:hover {
      opacity: 1;
      transform: translateX(0px) rotate(45deg);
      transition: all 7s ease-out;
    }
    & h3 {
      text-transform: capitalize;
    }
  `;
  const Flag = styled.div`
     {
      overflow: hidden;
      height: 12.6vw;
      width: 70%;
      margin: auto;
      position: Relative;
      border-radius: 50%;
      transform: rotate(0deg);
      transition: all 1s ease-out;
    }
    & div:hover {
      opacity: 1;
    }
    & img {
      height: 100%;
      transform: translateX(-10%);
      opacity: 0.9;
    }
  `;
  const Path1 = styled.div`
     {
      width: 100% !important;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      background-image: url(${SphereShadows});
      background-size: cover;
      mix-blend-mode: multiply;
      opacity: 0.7;
    }
  `;
  const Path2 = styled.div`
     {
      width: 100% !important;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 11;
      background-image: url(${SphereLigth});
      background-size: cover;
      mix-blend-mode: soft-light;
      opacity: 0.7;
    }
  `;
  // Componente presentacional de cada uno de los países mostrados en el Home
  return (
    <div className="country">
      <Link to={`/Country/${id}`}>
        <Country key={id}>
          <h3>{Name}</h3>
          <Flag id="flag">
            <Path1 />
            <Path2 />
            <img src={Image} />
          </Flag>
          <p>{Continent}</p>
          {location.pathname !== "/home" ? (
            <p className="subregion">{`Subregion: ${Region}`}</p>
          ) : null}
        </Country>
      </Link>
    </div>
  );
};

export default Country;
