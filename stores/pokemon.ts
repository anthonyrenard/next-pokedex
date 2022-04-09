import { makeAutoObservable } from "mobx";
import { ApiUriType, PokemonList, StoreStatus } from "../types";
import { Config } from "../utils";
import { PokemonDetail } from "./pokemon-detail";

export class Pokemon {
  constructor() {
    makeAutoObservable(this);
  }

  private _data: PokemonList[] = [];
  storeStatus: StoreStatus = StoreStatus.OFFLINE;

  /**
   * Fetch pokemon list
   */
  fetchPokemon = async (): Promise<void> => {
    this.setStoreStatus(StoreStatus.OFFLINE);

    try {
      const response = await fetch(Config.API_URI.POKEMON_LIST);
      const data = await response.json();

      this.setData(data.results);
      this.setStoreStatus(StoreStatus.ONLINE);
    } catch (error) {
      if (error) {
        console.error(error);
        this.setStoreStatus(StoreStatus.ERROR);
      }
    }
  };

  set data(data: PokemonList[]) {
    this._data = data;
  }

  get data(): PokemonList[] {
    return this._data;
  }

  setData(data: PokemonList[]): void {
    this.data = data;
  }

  setStoreStatus(status: StoreStatus) {
    this.storeStatus = status;
  }

  get pokemons(): PokemonDetail[] {
    return this.data.map((pokemon) => new PokemonDetail(pokemon));
  }
}

const singleton = new Pokemon();
export const pokemonStore = singleton;
