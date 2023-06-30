import { useEffect, useState } from "react";

import axios from "axios";

import { observer } from "mobx-react-lite";

import { IComment } from "../Types";

import { Card, Collapse, Space } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";

export const Comment: React.FC<IComment> = observer(
  ({ by, text, kids, localeDate }) => {
    const [getKids, setGetKids] = useState<IComment[]>([]);

    useEffect(() => {
      const getReplies = async () => {
        const localArr: IComment[] = [];
        kids?.map(
          async (id) =>
            await axios
              .get(
                `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
              )
              .then((res) => {
                localArr.push(res.data);
              })
              .then(() => {
                for (let i = 0; i < localArr.length; i++) {
                  localArr[i].localeDate = new Date(
                    localArr[i].time! * 1000
                  ).toLocaleString();
                }
              })
              .then(() => {
                if (localArr.length === kids.length)
                  setGetKids(localArr.sort((a, b) => b.time! - a.time!));
              })
              .catch((err) => console.log(err))
        );
      };
      if (kids?.length) getReplies();
    }, [kids]);

    return (
      <Card style={{ margin: 5 }}>
        <Space>
          <p>
            <strong>Автор: </strong>
            {by}
          </p>
          <p>
            <strong>Дата публикации: </strong>
            {localeDate}
          </p>
        </Space>
        <p>{text}</p>
        {getKids.map((item: IComment) => (
          <Collapse bordered={false} key={item.id}>
            <CollapsePanel
              key={item.localeDate}
              header={"Раскрыть комментарии"}
            >
              <Comment
                key={item.id}
                by={item.by}
                localeDate={item.localeDate}
                text={item.text}
                kids={item.kids}
              />
            </CollapsePanel>
          </Collapse>
        ))}
      </Card>
    );
  }
);
