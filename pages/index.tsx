import type { NextPage } from "next";
import { useEffect } from "react";
import { pokemonStore } from "../stores";

import { observer } from "mobx-react";

const Home: NextPage = observer(() => {
  const { fetchPokemon } = pokemonStore;

  useEffect(() => {
    (async () => {
      await fetchPokemon();
    })();
  }, [fetchPokemon]);

  return (
    <div className="container mx-auto">
      <div className="p-4 bg-teal-200 flex justify-between">
        <h1 className="text-xl font-bold uppercase">Pokemons</h1>
        <nav className="flex space-x-4">
          <div className="font-semibold text-sm uppercase opacity-60 hover:opacity-100 hover:underline cursor-pointer transition-opacity ease-in-out duration-300">
            Fire
          </div>
          <div className="font-semibold text-sm uppercase opacity-60 hover:opacity-100 hover:underline cursor-pointer transition-opacity ease-in-out duration-300">
            Water
          </div>
          <div className="font-semibold text-sm uppercase opacity-60 hover:opacity-100 hover:underline cursor-pointer transition-opacity ease-in-out duration-300">
            Leaf
          </div>
        </nav>
      </div>
      {pokemonStore.data.map((pokemon, index) => (
        <div key={index}>{pokemon.name}</div>
      ))}
    </div>
  );
});

export default Home;
