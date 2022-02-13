import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
import Home from "./components/home";
import Landing from "./components/landing";
import Detail from "./components/detail";
import Create from "./components/create";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname === "/" ? (
        <Landing />
      ) : (
        <>
          <Nav />
          <Routes>
            <Route strict exact path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/Country/:id" element={<Detail />} />
            <Route path="/prueba" element={<div>hola</div>} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
