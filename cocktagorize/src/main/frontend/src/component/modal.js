import React from "react";
import Tag from "./common/tag.js";
import styled from "styled-components";

const Window = styled.div`
	width: 800px;
	height: 500px;
	border-radius: 50px;
	background-color: white;
	border: solid;
	border-color: black;
	border-width: 5px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

function Modal(props) {
	return <Window></Window>;
}

export default Modal;
