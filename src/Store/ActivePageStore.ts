import { makeAutoObservable } from "mobx";

class ActivePageStore {
  id = 0;
  constructor() {
    makeAutoObservable(this);
  }
  setActiveId(state: number) {
    this.id = state;
  }
  removeActiveId() {
    this.id = 0;
  }
}

export default new ActivePageStore();
