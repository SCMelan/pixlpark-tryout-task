import { useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import { IArrayPosts } from "../Types";

import { Content } from "antd/es/layout/layout";
import { Post } from "../Components/Post";

import { Button, Row, Spin } from "antd";

import { LoadingOutlined, RedoOutlined } from "@ant-design/icons";

import { observer } from "mobx-react-lite";
import LoadingStore from "../Store/LoadingStore";
import RerenderStore from "../Store/RerenderStore";
import ArrayPostsStore from "../Store/ArrayPostsStore";
import ActivePageStore from "../Store/ActivePageStore";

export const MainPage: React.FC = observer(() => {
  const getData = async () => {
    const allPostId: number[] = [];
    const postsArray: IArrayPosts[] = [];
    ArrayPostsStore.setClearAllPosts();
    await axios
      .get(
        `https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty&limitToFirst=100&orderBy="$key"`
      )
      .then((res) => {
        allPostId.push(...res.data);
      })
      .catch((err) => console.log(err));

    await axios
      .all(
        allPostId.map(async (id) => {
          await axios
            .get(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
            )
            .then((res) => postsArray.push(res.data));
        })
      )
      .then(() => LoadingStore.setLoaded())
      .then(() => {
        postsArray.sort((a, b) => b.time - a.time);
      })
      .then(() => {
        for (let i = 0; i < postsArray.length; i++) {
          postsArray[i].localeDate = new Date(
            postsArray[i].time * 1000
          ).toLocaleString();
        }
      })
      .catch((err) => console.log(err));

    ArrayPostsStore.setAllPost(postsArray);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      LoadingStore.setLoading();
      getData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getData();
  }, [RerenderStore.rerender]);

  return (
    <Content>
      <Row justify={"center"}>
        <Button
          size="large"
          icon={LoadingStore.loading ? <LoadingOutlined /> : <RedoOutlined />}
          style={{ width: 300, margin: 5 }}
          onClick={(e) => {
            e.preventDefault();
            LoadingStore.setLoading();
            RerenderStore.setRerender();
          }}
        >
          {LoadingStore.loading
            ? "Получение свежих данных"
            : "Обновить список новостей"}
        </Button>
      </Row>

      <Row justify={"center"}>
        {LoadingStore.loading ? (
          <Spin size="large" style={{ margin: 10 }} />
        ) : (
          ArrayPostsStore.postsArray.map((item) => {
            return (
              <Link
                to={`/post_${item?.id}`}
                key={item?.title + item?.time}
                onClick={() => ActivePageStore.setActiveId(item.id)}
              >
                <Post
                  title={item?.title}
                  by={item?.by}
                  rate={item?.score}
                  date={item?.localeDate}
                />
              </Link>
            );
          })
        )}
      </Row>
    </Content>
  );
});
