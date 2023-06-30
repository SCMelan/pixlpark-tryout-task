export interface IPost {
  title: string;
  by: string;
  rate: number;
  date: string;
}

export interface IPostPage extends IPost {
  localeDate: string;
  url: string;
  time: number;
  descendants: number;
  kids: number[];
  id: number;
}

export interface IArrayPosts {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url?: string;
  text?: string;
  kids?: number[];
  localeDate: string;
}

export interface IComment {
  by: string;
  date?: string;
  text: string;
  id?: number;
  kids?: number[];
  parent?: number;
  time?: number;
  type?: string;
  localeDate: string;
  replies?: () => {};
}
