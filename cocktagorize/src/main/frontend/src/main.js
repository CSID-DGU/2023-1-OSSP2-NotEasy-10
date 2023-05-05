import CocktailCard from "./cocktailCard.js";

const styles = {
	body: {
		backgroundColor: "#DDDDDD",
		width: "100vw",
		height: "100vh",
	},
};

function Main() {
	return (
		<div style={styles.body}>
			<CocktailCard />
		</div>
	);
}

export default Main;
