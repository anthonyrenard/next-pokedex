import { makeAutoObservable } from "mobx";
import { PokemonData, PokemonList, StoreStatus } from "../types";
import { Config } from "../utils";

export class PokemonDetail {
  constructor(protected detail: PokemonList) {
    makeAutoObservable(this);

    this.fetchDetail();
  }

  private _data: PokemonData = {};
  storeStatus: StoreStatus = StoreStatus.OFFLINE;

  get url(): string {
    return this.detail.url;
  }

  get id(): number {
    return Number(this.url.split("/")[this.url.split("/").length - 2]);
  }

  get name(): string {
    return this.detail.name;
  }

  get image(): string {
    return Config.API_URI.POKEMON_IMAGE(String(this.id));
  }

  fetchDetail = async (): Promise<void> => {
    try {
      this.setStoreStatus(StoreStatus.OFFLINE);

      const response = await fetch(
        Config.API_URI.POKEMON_DETAIL(String(this.id))
      );
      const data = await response.json();

      this.setData(data);
      this.setStoreStatus(StoreStatus.ONLINE);
    } catch (error) {
      console.error(error);
      this.setStoreStatus(StoreStatus.ERROR);
    }
  };

  set data(data: PokemonData) {
    this._data = data;
  }

  get data(): PokemonData {
    return this._data;
  }

  setData(data: PokemonData): void {
    this.data = data;
  }

  setStoreStatus(status: StoreStatus) {
    this.storeStatus = status;
  }
}
