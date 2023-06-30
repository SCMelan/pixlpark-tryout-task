import { makeAutoObservable } from "mobx";

class RerenderStore {
  rerender = false;
  constructor() {
    makeAutoObservable(this);
  }
  setRerender() {
    this.rerender = !this.rerender;
  }
}

export default new RerenderStore();
