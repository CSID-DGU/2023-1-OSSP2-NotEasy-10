import React from "react";

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

function Tag(props) {
	return (
		<div style={styles.tag}>
			<p style={styles.nameText}>{props.name}</p>
		</div>
	);
}

export default Tag;
