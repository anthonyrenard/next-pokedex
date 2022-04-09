export interface ApiUriType {
  POKEMON_LIST: string;
}

export enum StoreStatus {
  OFFLINE,
  ONLINE,
  ERROR,
}

export interface PokemonList {
  name: string;
  url: string;
}

export interface PokemonData {
  height?: number;
  weight?: number;
  types?: PokemonDataType[];
  sprites?: PokemonDataSprite;
}

export interface PokemonDataType {
  type: {
    name: string;
  };
}

export interface PokemonDataSprite {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}
