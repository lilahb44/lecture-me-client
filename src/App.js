import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;

export default function App() {
  const [token, setToken] = useState();

  const onUserLogedIn = token => {
    setToken(token);
  };

  return (
    <Router>
      <CssBaseline />
      <Wrapper>
        <Header token={token}></Header>
        <Content>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/register">
              <Register onUserLogedIn={onUserLogedIn} />
            </Route>
            <Route path="/groups">
              <Groups />
            </Route>
            <Route path="/surveys">
              <Surveys />
            </Route>
            <Route path="/orders">
              <Orders />
            </Route>
            <Route path="/">
              <SignIn onUserLogedIn={onUserLogedIn} />
            </Route>
          </Switch>
        </Content>
        <Footer />
      </Wrapper>
    </Router>
  );
}

function Groups() {
  return <h2>Groups</h2>;
}
function Surveys() {
  return <h2>Surveys</h2>;
}
function Orders() {
  return <h2>Orders</h2>;
}
