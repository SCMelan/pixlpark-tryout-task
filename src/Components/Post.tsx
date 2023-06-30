import { IPost } from "../Types";

import { Card } from "antd";

export const Post: React.FC<IPost> = ({ title, by, rate, date }) => {
  return (
    <Card title={title} style={{ width: "24vw", margin: 5 }} hoverable={true}>
      <p>
        <strong>Автор: </strong>
        {by}
      </p>
      <p>
        <strong>Рейтинг: </strong>
        {rate}
      </p>
      <p>
        <strong>Дата публикации: </strong>
        {date}
      </p>
    </Card>
  );
};
