import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
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
import Guests from "./pages/Guests";
import Surveys from "./pages/Surveys";
import Vote from "./pages/Vote";
import Lecturers from "./pages/Lecturers";
import LecturerProfile from "./pages/LecturerProfile";
import Orders from "./pages/Orders";
import Invitation from "./pages/Invitation";

const TOKEN = "TOKEN";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;

const HostApp = () => {
  const [token, setToken] = useState(() =>
    JSON.parse(localStorage.getItem(TOKEN))
  );

  const onTokenChanged = (newToken) => {
    setToken(newToken);
    localStorage.setItem(TOKEN, JSON.stringify(newToken));
  };

  return (
    <>
      <Header
        token={token}
        onUserLogedOut={() => onTokenChanged(null)}
      ></Header>
      <Content>
        <Switch>
          {token
            ? [
                <Route exact path="/">
                  <Welcome token={token} />
                </Route>,
                <Route path="/groups/:id">
                  <Guests token={token} />
                </Route>,
                <Route path="/groups">
                  <Groups token={token} />
                </Route>,
                <Route path="/surveys">
                  <Surveys token={token} />
                </Route>,
                <Route path="/orders">
                  <Orders token={token}></Orders>
                </Route>,
                <Route path="/lecturers">
                  <Lecturers token={token} />
                </Route>,
                <Route path="/lecturerProfile/:id">
                  <LecturerProfile token={token} />
                </Route>,
              ]
            : [
                <Route exact path="/">
                  <SignIn onUserLogedIn={onTokenChanged} />
                </Route>,
                <Route path="/register">
                  <Register onUserLogedIn={onTokenChanged} />
                </Route>,
              ]}
          <Redirect to="/" />
        </Switch>
      </Content>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Wrapper>
        <Switch>
          <Route path="/vote">
            <Vote />
          </Route>
          <Route path="/invitation">
            <Invitation />
          </Route>
          <Route path="/">
            <HostApp />
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  );
};

export default App;
