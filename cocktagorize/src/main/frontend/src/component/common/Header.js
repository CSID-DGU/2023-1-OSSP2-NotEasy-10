import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderBlock = styled.header`
  background-color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;

  & h3 {
    margin: 0;
  }
`;

const Header = () => {
  return (
    <HeaderBlock>
      <Link to="/">
        <h3>COCKTAGORIZE</h3>
      </Link>
    </HeaderBlock>
  );
};

export default Header;
