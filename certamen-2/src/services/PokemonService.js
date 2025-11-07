let pokemons = [
  { nombre: "Pikachu", tipo: "electrico", numero: 1 },
  { nombre: "Squirtle", tipo: "agua", numero: 4 },
];

export const PokemonService = {
  getPokemons: () => {
    return pokemons;
  },

  addPokemon: (pokemon) => {
    if (!pokemon.numero || pokemon.numero < 1) {
      throw new Error("El número del Pokémon debe ser 1 o mayor.");
    }
    if (!pokemon.nombre || pokemon.nombre.trim() === "") {
      throw new Error("El Pokémon debe tener un nombre.");
    }
    if (!pokemon.tipo || pokemon.tipo.trim() === "") {
      throw new Error("El Pokémon debe tener un tipo.");
    }
    pokemons.push(pokemon);
  },

  deletePokemon: (numero) => {
    const index = pokemons.findIndex((p) => p.numero === numero);
    if (index !== -1) {
      pokemons.splice(index, 1);
    } else {
      throw new Error("Pokémon no encontrado");
    }
  },

  deleteAll: () => {
    pokemons = [];
  },
};
