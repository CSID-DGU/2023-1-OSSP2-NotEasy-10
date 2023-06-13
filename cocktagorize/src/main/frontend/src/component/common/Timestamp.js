import React from "react";
import styled, { css } from "styled-components";

const Entire = styled.div`
	width: auto;
	display: flex;
	align-items: center;
	margin: 0px 10px 0px 5px;
	padding: 4px;
	border-radius: 0px;

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

	background-color: #cccccc;
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

function timeConvert(time) {
	return new Date(time).toLocaleString(); // Date 형식으로 변환
}

function Timestamp(props) {
	return (
		<Entire>
			<NameText>{timeConvert(props.created)} </NameText>
		</Entire>
	);
}

Timestamp.defaultProps = {
	created: "2021-01-01 00:00:00",
};

export default Timestamp;
