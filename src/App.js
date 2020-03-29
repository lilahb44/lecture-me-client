import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import styled from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import Welcome from "./pages/Welcome";
import Groups from "./pages/Groups";
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

const App = () => {
  const [token, setToken] = useState(() =>
    JSON.parse(localStorage.getItem(TOKEN))
  );

  const onTokenChanged = newToken => {
    setToken(newToken);
    localStorage.setItem(TOKEN, JSON.stringify(newToken));
  };

  return (
    <Router>
      <CssBaseline />
      <Wrapper>
        <Header
          token={token}
          onUserLogedOut={() => onTokenChanged(null)}
        ></Header>
        <Content>
          {token ? (
            <Switch>
              <Route exact path="/">
                <Welcome token={token} />
              </Route>
              <Route path="/groups">
                <Groups token={token} />
              </Route>
              <Route path="/surveys">
                <Surveys />
              </Route>
              <Route path="/orders">
                <Orders />
              </Route>
              <Redirect to="/" />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/">
                <SignIn onUserLogedIn={onTokenChanged} />
              </Route>
              <Route path="/register">
                <Register onUserLogedIn={onTokenChanged} />
              </Route>
              <Redirect to="/" />
            </Switch>
          )}
        </Content>
        <Footer />
      </Wrapper>
    </Router>
  );
};

export default App;

function Surveys() {
  return <h2>Surveys</h2>;
}
function Orders() {
  return <h2>Orders</h2>;
}
