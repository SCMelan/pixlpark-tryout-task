import { MainPage } from "./Pages";
import { PostPage } from "./Pages";

import { Route } from "react-router-dom";

import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";

function App() {
  return (
    <Layout>
      <Header style={{ color: "white" }}>
        <h1>Список новостей:</h1>
      </Header>
      <Route exact path={"/"}>
        <MainPage />
      </Route>
      <Route path={"/post_*"}>
        <PostPage />
      </Route>
    </Layout>
  );
}

export default App;
