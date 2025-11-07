import React, { useState } from "react";
import { PokemonService } from "../../services/PokemonService.js";
import PokemonForm from "../components/PokemonForm.jsx";
import PokemonView from "../components/PokemonView.jsx";

export default function PokemonContainer() {
  const [pokemons, setPokemons] = useState(PokemonService.getPokemons());

  const handleAdd = (pokemon) => {
    PokemonService.addPokemon(pokemon);
    setPokemons([...PokemonService.getPokemons()]);
  };

  const handleDelete = (numero) => {
    PokemonService.deletePokemon(numero);
    setPokemons([...PokemonService.getPokemons()]);
  };

  const handleDeleteAll = () => {
    PokemonService.deleteAll();
    setPokemons([...PokemonService.getPokemons()]);
  };

  return (
    <div className="container mt-3">
      <h2>Gestión de Pokemones</h2>
      <PokemonForm onAdd={handleAdd} />
      <PokemonView
        pokemons={pokemons}
        onDelete={handleDelete}
        onDeleteAll={handleDeleteAll}
      />
    </div>
  );
}
