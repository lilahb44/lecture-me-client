import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  font-size: 1.2em;
  text-align: center;
  color: palevioletred;
  flex-shrink: 0;
`;

function Footer() {
  return (
    <StyledFooter>Lilah Burger, Eran Sevil, Tomer Cohen&copy;</StyledFooter>
  );
}

export default Footer;
