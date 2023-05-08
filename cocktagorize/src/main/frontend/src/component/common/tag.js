import React, { isValidElement } from "react";
import styled, { css } from "styled-components";
import xImage from "../../images/xButton.png";

const styles = {
	tag: {
		width: "auto",
		height: 30,
		backgroundColor: "#6E41E2",
		display: "flex",
		alignItems: "center",
		margin: "4px 4px",
		borderRadius: 8,
	},
	nameText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
		margin: 8,
		wordBreak: "keep-all",
		webkitUserSelect: "none",
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
		<div
			style={styles.tag}
			onClick={() =>
				props.info.id !== 0
					? props.onDelete(props.info.id, props.info.isDeletable)
					: undefined
			}
		>
			<p style={styles.nameText}>{props.info.name} </p>
			{props.info.isDeletable === "true" ? (
				<Image src={xImage} alt={xImage} />
			) : null}
		</div>
	);
}

Tag.defaultProps = {
	info: {
		id: 0,
		name: "불러오기 실패",
		type: "오류",
		isDeletable: "false",
	},
};

export default Tag;
