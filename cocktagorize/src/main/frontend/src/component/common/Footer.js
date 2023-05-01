import React from "react";
import styled from "styled-components";

const FooterBlock = styled.footer`
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  height: 4rem;
  width: 100vw;
`;

const Footer = () => {
  return <FooterBlock></FooterBlock>;
};

export default Footer;
