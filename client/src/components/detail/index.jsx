import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import {getCountryByPk} from "../../redux/actions"
import SphereShadows from "../../img/shadows-sphere.jpg"
import SphereLigth from "../../img/ligths-sphere.jpg"
import Country from "../countries/Country"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faThLarge } from '@fortawesome/free-solid-svg-icons'


// detalle de país: debe contener

// [ ] Los campos mostrados en la ruta principal 
//para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
// [ ] Código de país de 3 letras (id)
// [ ] Capital
// [ ] Subregión
// [ ] Área (Mostrarla en km2 o millones de km2)
// [ ] Población
// [ ] Actividades turísticas con toda su información asociada


const Activities= styled.div`
{
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
} & .activityContainer {
    width: 30%;
    padding: 1%;
    margin: 15px 0;
    background: rgba(255, 255, 255, 0.2);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(5px);
border: 1px solid rgba(255, 255, 255, 0.3);
}`


const Index = () => {
    
    const {id} = useParams()

    const dispatch = useDispatch()
    useEffect(() => dispatch(getCountryByPk(id)), [dispatch])
    const country = useSelector(store => store.countryByPk)

    const Wrapper= styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    & #country {
        display: flex;
        justify-content: center;
        padding-bottom: 60px;
        width: 100%;
    } & #country {
        width: 80%;
        margin: auto;
    } & #infography, #sphere {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    } & .subregion {
        transform: translateY(42px);
    } 
    `

    return (
        country.hasOwnProperty("cca3") ?
        <> 
        <div id='title'>
        <h1 >{`${country.cca3} / ${country.name.toUpperCase()}`}</h1>
        <h3>{`Capital: ${country.capital}`}</h3>
        </div>
        
            <Wrapper>
                <div id = "country">
                
                <div id="sphere">
                <Country 
                Image ={country.flags }
                Continent={country.continents.join(", ")}
                Region = {country.subregion}
                id ={country.cca3} />
                </div>

                <div id ="infography">
                <p>{`Population : ${country.population} `}</p>
                <div class ="icons">{
                    country.population.toString().split("").map(e =>
                        <FontAwesomeIcon icon ={faMale}></FontAwesomeIcon>)
                }</div>
                <p>{`Area : ${country.area} `}</p>
                <div class ="icons">{
                    country.area.toString().split("").map(e =>
                        <FontAwesomeIcon icon ={faThLarge}></FontAwesomeIcon>)
                }</div>
                </div>
                </div>

                <h2 style={{margin:"0"}}>{country.activities.length? "Activities":null}</h2>

            <Activities>
           
            {country.activities.map(a =>
               <>
                <div className='activityContainer'>
                <h2>{a.name.toUpperCase()}</h2>
                 <hr></hr>
                <h3>{`dificutlty: ${a.difficulty}`}</h3>
                <div style={{width:"100%", height:"20px", backgroundColor:"#000"}}>
                <div style={{width:`${a.difficulty * 20}%`, height:"100%", backgroundColor:"#0c0"}}></div>
                </div>
                <h6>{`${a.duration} hours of duration`}</h6>
                <h2>Season it´s practiced</h2>
                <p>{a.season.join(", ")}</p>
                </div>
               </>
                )
                }
            </Activities>
            </Wrapper>

        </>:
        <div>cargando detalle...</div>
    );
};

export default Index;