import { useState } from "react";
import { useSelector } from "react-redux";
import { postActivity } from "../../redux/actions";
import styled from "styled-components";

// formulario controlado para crear una nueva actividad
//con los siguientes campos:
// Nombre
// Dificultad
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)
// Brinda la posibilidad de seleccionar/agregar varios países en simultaneo
// tiene un Botón/Opción para crear una nueva actividad turística

const Index = () => {
  let allCountries = useSelector((store) => store.allCountries);
  const [state, setState] = useState({
    search: "",
    name: "",
    difficulty: 0,
    duration: 0,
    season: [],
    countries: [],
  });

  allCountries = state.search.length
    ? allCountries.filter((c) => c.name.includes(state.search))
    : allCountries;

  const handleState = (e) => {
    // seteo el estado, según si la propiedad es un array o un string
    e.target.id === "season" || e.target.id === "countries"
      ? !state[e.target.id].includes(e.target.value)
        ? e.target.value.length &&
          setState({
            ...state,
            [e.target.id]: [...state[e.target.id], e.target.value],
          })
        : e.target.value.length &&
          setState({
            ...state,
            [e.target.id]: [
              ...state[e.target.id].filter(
                (element) => e.target.value != element
              ),
            ],
          })
      : e.target.value.length !== 0 &&
        setState({ ...state, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <div>
        <h1>Create here New Activity</h1>
        <p>that is popular in one or more countries</p>
      </div>

      <form>
        <div>
          <input
            id="name"
            type="text"
            placeholder="name of activity"
            onChange={(e) => handleState(e)}
          />
          {/* renderizado condicional de label para campos obligatorios */}
          <>
            {state.name.length > 2 &&
            !/[^a-zA-Z0]/.test(state.name.replace(/ /g, "")) ? (
              <p style={{ fontSize: ".8rem", margin: 0, color: "#9f9" }}>
                Great!!!
              </p>
            ) : (
              <p style={{ fontSize: ".8rem", margin: 0, color: "#f99" }}>
                Write some name, do not use special characters *
              </p>
            )}
          </>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <input
            id="search"
            type="text"
            placeholder="search country where its practiced"
            onChange={(e) => handleState(e)}
          />
          <select id="countries" onChange={(e) => handleState(e)} multiple>
            <option value="">Select Countries</option>
            {allCountries.map((c) => (
              <option
                value={c.name}
                style={{
                  color: state.countries.includes(c.name) ? "#0b0" : "#fff",
                }}
              >
                {c.name}
              </option>
            ))}
          </select>

          <>
            {/* renderizado condicional de texto para campos obligatorios */}
            {state.countries.length ? (
              <p style={{ fontSize: ".8rem", margin: "10px", color: "#9f9" }}>
                Great!!! you have chosen next countries...
                {state.countries.map((c) => (
                  <>
                    <div>
                      <button
                        style={{
                          fontSize: ".8rem",
                          margin: "10px",
                          position: "relative",
                        }}
                      >
                        {c}
                        <span
                          id={c}
                          onClick={(e) => {
                            setState({
                              ...state,
                              countries: [
                                ...state.countries.filter(
                                  (element) => e.target.id != element
                                ),
                              ],
                            });
                            return e.preventDefault();
                          }}
                          style={{
                            fontSize: ".9rem",
                            margin: 0,
                            color: "#fff",
                            position: "absolute",
                            top: "-1px",
                            right: 0,
                            padding: `0 3px`,
                            backgroundColor: "#b00",
                            borderRadius: "2px",
                            border: "solid 1px",
                          }}
                        >
                          x
                        </span>
                      </button>
                    </div>
                  </>
                ))}
              </p>
            ) : (
              <p style={{ fontSize: ".8rem", margin: "20px", color: "#f99" }}>
                Choosing one or more countries is required *
              </p>
            )}
          </>
        </div>

        <div>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px",
            }}
          >{`Difficulty: ${state.difficulty}  `}</label>
          <input
            id="difficulty"
            type="range"
            min="0"
            max="5"
            defaultValue="0"
            onChange={(e) => handleState(e)}
          />
        </div>

        <div>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px",
            }}
          >{`Duration on Hours: ${state.duration}  `}</label>
          <input
            id="duration"
            type="range"
            min="0"
            max="10"
            defaultValue="0"
            onChange={(e) => handleState(e)}
          />
        </div>

        <div>
          <p>station where the activity is practiced</p>
          <select
            id="season"
            onChange={(e) => handleState(e)}
            style={{ marginBottom: "10px", width: "30%" }}
            multiple
          >
            <option value="">Season</option>

            <option
              onClick={(e) => e.preventDefault()}
              value="summer"
              style={{
                color: state.season.includes("summer") ? "#0b0" : "#fff",
              }}
            >
              summer
            </option>

            <option
              onClick={(e) => e.preventDefault()}
              value="fall"
              style={{ color: state.season.includes("fall") ? "#0b0" : "#fff" }}
            >
              fall
            </option>

            <option
              onClick={(e) => e.preventDefault()}
              value="winter"
              style={{
                color: state.season.includes("winter") ? "#0b0" : "#fff",
              }}
            >
              winter
            </option>

            <option
              onClick={(e) => e.preventDefault()}
              value="spring"
              style={{
                color: state.season.includes("spring") ? "#0b0" : "#fff",
              }}
            >
              spring
            </option>
          </select>
          <div>
            {state.season.map((c) => (
              <>
                <div>
                  <button
                    style={{
                      width: "30%",
                      fontSize: ".8rem",
                      margin: "10px",
                      position: "relative",
                    }}
                  >
                    {c}
                    <span
                      id={c}
                      onClick={(e) => {
                        setState({
                          ...state,
                          season: [
                            ...state.season.filter(
                              (element) => e.target.id != element
                            ),
                          ],
                        });
                        return e.preventDefault();
                      }}
                      style={{
                        fontSize: ".9rem",
                        margin: 0,
                        color: "#fff",
                        position: "absolute",
                        top: "-1px",
                        right: 0,
                        padding: `0 3px`,
                        backgroundColor: "#b00",
                        borderRadius: "2px",
                        border: "solid 1px",
                      }}
                    >
                      x
                    </span>
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
        <div>
          {state.countries.length &&
          state.name.length > 2 &&
          !/[^a-zA-Z0]/.test(state.name.replace(/ /g, "")) ? (
            // Con el botón se hace post para crear una nueva actividad turística
            // Relacionada a los países elegidos por el usuario
            <button
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "35px",
                backgroundColor: "green",
              }}
              onClick={() =>
                postActivity({
                  name: state.name.trim(),
                  difficulty: Number(state.difficulty),
                  duration: Number(state.duration),
                  season: state.season,
                  countries: state.countries,
                })
              }
            >
              Save New Activity
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Index;
