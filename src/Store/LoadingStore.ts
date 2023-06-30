import { makeAutoObservable } from "mobx";

class LoadingStore {
  loading = true;
  constructor() {
    makeAutoObservable(this);
  }
  setLoading() {
    this.loading = true;
  }
  setLoaded() {
    this.loading = false;
  }
}

export default new LoadingStore();
