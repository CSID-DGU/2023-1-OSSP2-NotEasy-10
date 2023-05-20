import React from "react";
import styled, { css } from "styled-components";

const Entire = styled.div`
	width: auto;
	display: flex;
	align-items: center;
	margin: 0px 5px;
	padding: 4px;
	border-radius: 8px;

	@media (max-height: 450px) {
		height: 12px;
	}
	@media (min-height: 450px) and (max-height: 600px) {
		height: 14px;
	}
	@media (min-height: 600px) and (max-height: 750px) {
		height: 16px;
	}
	@media (min-height: 750px) and (max-height: 900px) {
		height: 18px;
	}
	@media (min-height: 900px) {
		height: 20px;
	}

	${(props) => {
		switch (props.type) {
			case "RECIPE":
				return css`
					background-color: #cfdfff;
				`;
			case "TIP":
				return css`
					background-color: #ffcffa;
				`;
			default:
				return css`
					background-color: #6e41e2;
				`;
		}
	}}
`;

const NameText = styled.div`
	color: black;
	font-weight: bold;
	margin: 4px;
	word-break: keep-all;
	white-space: nowrap;
	-webkit-user-drag: none;
	-webkit-user-select: none;

	@media (max-width: 600px) {
		font-size: 4px;
	}
	@media (min-width: 600px) and (max-width: 900px) {
		font-size: 6px;
	}
	@media (min-width: 900px) and (max-width: 1200px) {
		font-size: 8px;
	}
	@media (min-width: 1200px) and (max-width: 1600px) {
		font-size: 10px;
	}
	@media (min-width: 1600px) {
		font-size: 12px;
	}
`;

function PostTag(props) {
	return (
		<Entire type={props.type}>
			<NameText>{props.type} </NameText>
		</Entire>
	);
}

PostTag.defaultProps = {
	type: "TIP",
};

export default PostTag;
