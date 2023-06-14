import React from "react";
import styled from "styled-components";

const FooterBlock = styled.footer`
	background-color: rgba(0, 0, 0, 0.1);
	position: relative;
	transform: translateY(-100%);
	height: 4rem;
`;

const Footer = () => {
	return <FooterBlock></FooterBlock>;
};

export default Footer;
