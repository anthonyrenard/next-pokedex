import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { PokemonDetail, pokemonStore } from "../stores";

import { observer } from "mobx-react";
import { StoreStatus } from "../types";
import { Card, Loader } from "../components";

import Image from "next/image";

const Home: NextPage = observer(() => {
  const { fetchPokemon } = pokemonStore;
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [pokemons, setPokemons] = useState(pokemonStore.pokemons);

  useEffect(() => {
    (async () => {
      await fetchPokemon();
    })();
  }, [fetchPokemon]);

  const filters = [
    "grass",
    "poison",
    "flying",
    "fire",
    "bug",
    "water",
    "normal",
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (selectedFilter !== null) {
      const tmpPokemons = pokemonStore.pokemons.filter((pokemon) =>
        pokemon.data.types?.find((type) => type.type.name === selectedFilter)
      );

      setPokemons(tmpPokemons);
    } else {
      setPokemons(pokemonStore.pokemons);
    }
  });

  return (
    <div className="container mx-auto">
      <div className="sticky top-0 z-50 p-4 bg-teal-200 flex justify-between">
        <h1 className="text-xl font-bold uppercase">Pokemons</h1>
      </div>
      <div className="border-b p-4 flex justify-between items-center">
        <div>In the list ({pokemons.length})</div>
        <nav className="flex items-center space-x-4">
          {filters.sort().map((filter) => (
            <div
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`font-semibold text-sm uppercase opacity-60 hover:opacity-100 hover:underline cursor-pointer transition-opacity ease-in-out duration-300 ${
                selectedFilter === filter && "opacity-100 underline"
              }`}
            >
              {filter}
            </div>
          ))}
        </nav>
        <div>
          {selectedFilter !== null && (
            <div
              className="text-xs uppercase cursor-pointer font-semibold"
              onClick={() => setSelectedFilter(null)}
            >
              Remove Filter
            </div>
          )}
        </div>
      </div>
      {pokemonStore.storeStatus !== StoreStatus.ONLINE ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-4 gap-8 my-8">
          {pokemons
            .filter((pokemon) => pokemon)
            .map((pokemon, index) => (
              <Card key={index} pokemon={pokemon} />
            ))}
        </div>
      )}
    </div>
  );
});

export default Home;
