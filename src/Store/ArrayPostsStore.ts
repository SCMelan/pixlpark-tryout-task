import { makeAutoObservable } from "mobx";
import { IArrayPosts } from "../Types";

class ArrayPostsStore {
  postsArray: IArrayPosts[] = [];

  constructor() {
    makeAutoObservable(this);
  }
  setAllPost(state: IArrayPosts[]) {
    this.postsArray.push(...state);
  }
  setClearAllPosts() {
    this.postsArray = [];
  }
}

export default new ArrayPostsStore();
