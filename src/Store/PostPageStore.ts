import { makeAutoObservable } from "mobx";
import { IPostPage } from "../Types";

class PostPageStore {
  PostPageStore: IPostPage = {
    localeDate: "",
    url: "",
    time: 0,
    title: "",
    by: "",
    rate: 0,
    date: "",
    descendants: 0,
    kids: [],
    id: 0,
  };
  constructor() {
    makeAutoObservable(this);
  }
  setPostPage(state: IPostPage) {
    this.PostPageStore = state;
  }
  removePostPage() {
    this.PostPageStore = {
      localeDate: "",
      url: "",
      time: 0,
      title: "",
      by: "",
      rate: 0,
      date: "",
      descendants: 0,
      kids: [],
      id: 0,
    };
  }
}

export default new PostPageStore();
