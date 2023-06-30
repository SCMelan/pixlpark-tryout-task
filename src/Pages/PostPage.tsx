import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { IComment } from "../Types";

import { Button, Card, Space, Spin } from "antd";
import { Content } from "antd/es/layout/layout";

import { observer } from "mobx-react-lite";
import { Comment } from "../Components";

import ActivePageStore from "../Store/ActivePageStore";
import LoadingStore from "../Store/LoadingStore";
import PostPageStore from "../Store/PostPageStore";
import PostPageCommentsStore from "../Store/PostPageCommentsStore";

export const PostPage: React.FC = observer(() => {
  const [quantityComments, setQuantityComments] = useState(0); //используются для получения кол-ва комментариев после обновления комментариев в компоненте
  const getData = async () => {
    await axios
      .get(
        `https://hacker-news.firebaseio.com/v0/item/${ActivePageStore.id}.json?print=pretty`
      )
      .then((res) => {
        const localeRes = { ...res.data };
        localeRes.localeDate = new Date(localeRes.time * 1000).toLocaleString();
        LoadingStore.setLoaded();
        PostPageStore.setPostPage(localeRes);
        getQuantityComments();
      })
      .catch((err) => console.log(err));
  };

  const getQuantityComments = () =>
    axios
      .get(
        `https://hacker-news.firebaseio.com/v0/item/${ActivePageStore.id}.json?print=pretty`
      )
      .then((res) => setQuantityComments(res.data.descendants))
      .catch((err) => console.log(err));

  const getRootComments = async () => {
    const localComments: IComment[] = [];
    PostPageCommentsStore.setClearAllPosts();

    await axios.all(
      PostPageStore.PostPageStore?.kids?.map(async (id) => {
        await axios
          .get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          )
          .then((res) => localComments.push(res.data))
          .catch((err) => console.log(err));
      })
    );
    for (let i = 0; i < localComments.length; i++) {
      localComments[i].localeDate = new Date(
        localComments[i].time! * 1000
      ).toLocaleString();
    }
    PostPageCommentsStore.setAllPost(
      localComments.sort((a, b) => b.time! - a.time!)
    );
  };

  useEffect(() => {
    getData().then(() => {
      if (PostPageStore.PostPageStore.kids?.length) getRootComments();
    });
  }, []);

  return (
    <Content
      style={{
        display: "flex",
        alignItems: "center",
        margin: 5,
        flexDirection: "column",
      }}
    >
      <Content>
        <Space>
          <Link to={`/`}>
            <Button
              style={{
                margin: 5,
              }}
              onClick={() => {
                ActivePageStore.removeActiveId();
                PostPageStore.removePostPage();
                LoadingStore.setLoading();
              }}
            >
              К странице с новостями
            </Button>
          </Link>
          {PostPageStore.PostPageStore.descendants > 0 && (
            <Button
              style={{
                margin: 5,
              }}
              onClick={(e) => {
                e.preventDefault();
                getRootComments();
                getQuantityComments();
              }}
            >
              Обновить комментарии
            </Button>
          )}
        </Space>
      </Content>
      {!PostPageStore.PostPageStore.localeDate ? (
        <Spin size="large" style={{ margin: 10 }} />
      ) : (
        <Card
          title={PostPageStore.PostPageStore.title}
          style={{
            maxWidth: "50vw",
          }}
        >
          <p>
            <strong>Ссылка на источник: </strong>
            {PostPageStore.PostPageStore.url === undefined ? (
              <span>Источник отсутствует</span>
            ) : (
              <a href={PostPageStore.PostPageStore.url}>
                нажмите, чтобы перейти
              </a>
            )}
          </p>
          <p>
            <strong>Дата публикации: </strong>
            {PostPageStore.PostPageStore.localeDate}
          </p>
          <p>
            <strong>Автор: </strong>
            {PostPageStore.PostPageStore.by}
          </p>
          <p>
            <strong>Количество комментариев: </strong>
            {quantityComments}
          </p>
          <h4>Список комментариев:</h4>
          {PostPageStore.PostPageStore.descendants > 0 &&
            PostPageCommentsStore.PostPageCommentsStore.map((item) => (
              <Comment
                key={item.id}
                by={item.by}
                localeDate={item.localeDate}
                text={item.text}
                kids={item.kids}
              />
            ))}
        </Card>
      )}
    </Content>
  );
});
