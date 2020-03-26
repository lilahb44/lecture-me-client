import React, { useState, useEffect } from "react";
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

const TOKEN = "TOKEN";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN));

  const onTokenChanged = newToken => {
    setToken(newToken);
    localStorage.setItem(TOKEN, newToken);
  };

  return (
    <Router>
      <CssBaseline />
      <Wrapper>
        <Header token={token} onUserLogedOut={onTokenChanged}></Header>
        <Content>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/register">
              <Register onUserLogedIn={onTokenChanged} />
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
              <SignIn onUserLogedIn={onTokenChanged} />
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
