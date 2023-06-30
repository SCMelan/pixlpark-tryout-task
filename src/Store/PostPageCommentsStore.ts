import { makeAutoObservable } from "mobx";
import { IComment } from "../Types";

class PostPageCommentsStore {
  PostPageCommentsStore: IComment[] = [];

  constructor() {
    makeAutoObservable(this);
  }
  setAllPost(state: IComment[]) {
    this.PostPageCommentsStore.push(...state);
  }
  setClearAllPosts() {
    this.PostPageCommentsStore = [];
  }
}

export default new PostPageCommentsStore();
