import React from "react";
import PokemonContainer from "./assets/containers/PokemonContainer.jsx";
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

function App() {
  return (
    <div className="App">
      <PokemonContainer />
    </div>
  );
}

export default App;
