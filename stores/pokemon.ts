import { makeAutoObservable } from "mobx";
import { PokemonList, StoreStatus } from "../types";

export class PokemonStore {
  constructor() {
    makeAutoObservable(this);
  }

  API_URI: string = "https://pokeapi.co/api/v2/pokemon";

  storeStatus: StoreStatus = StoreStatus.OFFLINE;
  _data: PokemonList[] = [];

  /**
   * Fetch pokemon list
   */
  fetchPokemon = async (): Promise<void> => {
    this.setStoreStatus(StoreStatus.OFFLINE);

    try {
      const response = await fetch(this.API_URI);
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

  // Fetch pokemon detail
}

const singleton = new PokemonStore();
export const pokemonStore = singleton;
