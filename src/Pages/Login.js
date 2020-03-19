import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Login = props => {
  return (
    <Title>
      Welcome {props.firstName} {props.lastName}!
    </Title>
  );
};

export default Login;
