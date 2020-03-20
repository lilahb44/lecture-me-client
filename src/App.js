import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
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
  return (
    <Router>
      <Wrapper>
        <Header user={{ firstName: "Tal" }}></Header>
        <Content>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/register">
              <Register />
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
              <Login />
            </Route>
          </Switch>
        </Content>
        <Footer />
      </Wrapper>
    </Router>
  );
}
function Login() {
  return <h2>Login</h2>;
}
function Register() {
  return <h2>Resgister</h2>;
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
