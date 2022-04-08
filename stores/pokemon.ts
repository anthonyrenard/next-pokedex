import { makeAutoObservable } from "mobx";
import { ApiUriType, PokemonList, StoreStatus } from "../types";
import { Config } from "../utils";

export class PokemonStore {
  constructor() {
    makeAutoObservable(this);
  }

  private API_URI: ApiUriType = {
    POKEMON_LIST: `${Config.POKEMON_API_URI}/pokemon`,
  };
  private _data: PokemonList[] = [];

  storeStatus: StoreStatus = StoreStatus.OFFLINE;

  /**
   * Fetch pokemon list
   */
  fetchPokemon = async (): Promise<void> => {
    this.setStoreStatus(StoreStatus.OFFLINE);

    try {
      const response = await fetch(this.API_URI.POKEMON_LIST);
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
