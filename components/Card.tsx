import { observer } from "mobx-react";
import { PokemonDetail } from "../stores";

import Image from "next/image";

export const Card: React.FC<{ pokemon: PokemonDetail }> = observer(
  ({ pokemon }) => {
    return (
      <div className="border border-gray-200 flex flex-col">
        <div className="p-20">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={150}
            height={150}
            layout="responsive"
          />
        </div>
        <div className="border-t border-gray-200 p-4 flex justify-center items-center">
          <div className="text-sm uppercase font-semibold text-center">
            {pokemon.name}
          </div>
        </div>
      </div>
    );
  }
);
