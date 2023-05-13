import React, { isValidElement } from "react";
import styled, { css } from "styled-components";
import xImage from "../../images/xButton.png";
import plusImage from "../../images/plusButton.png";

const styles = {
	nameText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
		margin: 8,
		wordBreak: "keep-all",
		WebkitUserSelect: "none",
	},
	webkitScrollbar: {
		height: 10,
	},
	webkitScrollbarThumb: {
		width: "auto",
		backgroundColor: "#217af4",
		borderRadius: 10,
	},
	webkitScrollbarTrack: {
		backgroundColor: "rgba(33, 122, 244, 0.1)",
	},
};

const Entire = styled.div`
	width: auto;
	display: flex;
	align-items: center;
	margin: 4px 4px;
	padding: 4px;
	border-radius: 8px;

	@media (max-height: 450px) {
		height: 12px;
	}
	@media (min-height: 450px) and (max-height: 600px) {
		height: 16px;
	}
	@media (min-height: 600px) and (max-height: 750px) {
		height: 20px;
	}
	@media (min-height: 750px) and (max-height: 900px) {
		height: 25px;
	}
	@media (min-height: 900px) {
		height: 30px;
	}

	${(props) => {
		if (props.isOverlap === true) {
			return css`
				background-color: #808080;
			`;
		} else {
		}

		switch (props.type) {
			case "INGREDIENT":
				return css`
					background-color: #6e41e2;
				`;
			case "ALCOHOL":
				return css`
					background-color: brown;
				`;
			case "COLOR":
				return css`
					background-color: red;
				`;
			case "TASTE":
				return css`
					background-color: darkorange;
				`;
			case "ETC":
				return css`
					background-color: green;
				`;
			case "WEATHER":
				return css`
					background-color: purple;
				`;
			default:
				return css`
					background-color: #6e41e2;
				`;
		}
	}}
`;

const NameText = styled.div`
	color: white;
	font-weight: bold;
	margin: 8px;
	word-break: keep-all;
	white-space: nowrap;
	--webkit-user-select: none;

	@media (max-width: 600px) {
		font-size: 6px;
	}
	@media (min-width: 600px) and (max-width: 900px) {
		font-size: 8px;
	}
	@media (min-width: 900px) and (max-width: 1200px) {
		font-size: 10px;
	}
	@media (min-width: 1200px) and (max-width: 1600px) {
		font-size: 12px;
	}
	@media (min-width: 1600px) {
		font-size: 14px;
	}
`;

const Image = styled.img`
	width: 10px;
	height: 10px;
	margin-top: 2px;
	margin-right: 8px;
	-webkit-user-drag: none;
	-webkit-user-select: none;
`;

function Tag(props) {
	return (
		<Entire
			type={props.info.type}
			isOverlap={props.isOverlap}
			onClick={() => {
				if (props.info.mode === "delete" || props.isOverlap === true) {
					props.onDelete(props.info.id, props.info.mode);
				}
				if (props.info.mode === "add") {
					props.onAdd(props.info);
				}
			}}
		>
			<NameText>{props.info.name} </NameText>
			{props.info.mode === "delete" ? (
				<Image src={xImage} alt={xImage} />
			) : null}
			{props.info.mode === "add" ? (
				<Image src={plusImage} alt={plusImage} />
			) : null}
		</Entire>
	);
}

Tag.defaultProps = {
	info: {
		id: 0,
		name: "불러오기 실패",
		type: "오류",
		mode: "none",
		isOverlap: "false",
	},
};

export default Tag;
