import React from "react";
import cocktailImage from "./cocktailsample.png";
import blackHeartImage from "./blackHeart.png";
import soundImage from "./sound.png";
import Tag from "./tag.js";

const styles = {
	card: {
		width: 300,
		height: 480,
		backgroundColor: "#FFFFFF",
	},
	image: {
		width: 300,
		height: 300,
	},
	container: {
		margin: "8px 16px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	titleContainer: {
		margin: 0,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	nameText: {
		width: 200,
		color: "black",
		fontSize: 24,
		fontWeight: "bold",
		margin: "0px 10px 10px 10px",
	},
	soundImage: {
		width: 20,
		height: 20,
		margin: "auto",
	},
	tagContainer: {
		margin: "0px 8px",
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		overflowX: "hidden",
		overflowY: "auto",
		height: "76px",
	},
	heartContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		margin: "8px 0px",
	},
	blackHeart: {
		width: 16,
		height: 16,
		margin: "0px 8px",
	},
	heartText: {
		margin: "0px 4px",
	},
};

function CocktailCard(props) {
	return (
		<div style={styles.card}>
			<img style={styles.image} src={cocktailImage} alt={cocktailImage} />
			<div style={styles.container}>
				<div style={styles.titleContainer}>
					<h5 style={styles.nameText}>Card title</h5>
					<img
						style={styles.soundImage}
						src={soundImage}
						alt={soundImage}
					/>
				</div>
				<div style={styles.tagContainer}>
					<Tag name="태그1" />
					<Tag name="태그2" />
					<Tag name="태그123123123123123123" />
				</div>
				<div style={styles.heartContainer}>
					<img
						style={styles.blackHeart}
						src={blackHeartImage}
						alt={blackHeartImage}
					/>
					<p style={styles.heartText}>123</p>
				</div>
			</div>
		</div>
	);
}

export default CocktailCard;
