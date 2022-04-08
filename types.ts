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

export interface Pokemon {}
