import styled, { css } from "styled-components";

export const Entire = styled.div`
	display: flex;
	flexdirection: row;
`;

export const NonSidebar = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 25px;
	margin-left: 50px;
	width: 1475px;
	height: 720px;
`;

export const NonExplore = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	border: solid;
	border-color: black;
	border-width: 2px;

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-track {
		background-color: #ccccff;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 0px;
		background-color: #6666ff;
	}

	&::-webkit-scrollbar-button {
		width: 0;
		height: 0;
	}
`;

export const Explore = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: auto;
	height: 100px;
	margin: 20px 50px 10px 0px;
`;

export const Search = styled.input`
	width: 300px;
	height: 50px;
	border-radius: 15px;
	padding: 0px 10px;
	border-color: black;
	font-size: 24px;
`;

export const Sort = styled.select`
	width: 300px;
	height: 50px;
	border-radius: 15px;
	padding: 0px 10px;
	border-color: black;
	font-size: 18px;
`;

export const SortBase = styled.option`
	font-size: 18px;
`;

export const WeatherNUserCocktail = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: auto;
	height: auto;
	margin: 5px 0px 0px 0px;
	border: solid;
	border-color: black;
	border-width: 2px;
`;

export const Weather = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 400px;
	height: auto;
	border: solid;
	border-radius: 10px;
	border-color: black;
	margin: 0px 10px;
`;

export const WeatherInfoBox = styled.div`
	width: 380px;
	height: 50px;
	margin: 5px;
	padding: auto 10px;
	border: solid;
	border-radius: 5px;
	border-color: black;
`;

export const WeatherInfo = styled.p`
	text-justify: center;
	font-size: 18px;
	margin: 10px;
`;

export const WeatherCarousel = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 380px;
	height: auto;
	margin: 0px;
	padding: 0px;
	border: solid;
	border-radius: 5px;
	border-color: black;
`;

export const WeatherScroll = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 380px;
	height: auto;
	margin: 0px;
	padding: 0px;
	border: solid;
	border-radius: 5px;
	border-color: black;
`;

export const WeatherScrollArrow = styled.div`
	width: 50px;
	height: 50px;
	margin: 5px;
	padding: 0px;
	border: solid;
	border-color: black;
	border-radius: 10px;
	background-color: white;

	&:hover {
		background-color: gray;
	}

	transition: background-color 0.2s;
`;

export const WeatherScrollIndex = styled.div`
	width: 40px;
	height: 50px;
	margin: 2px;
	padding: 0px;
	border: solid;
	border-color: black;
	border-radius: 10px;
	background-color: white;

	&:hover {
		background-color: #ccccff;
		${(props) => {
			if (props.index === props.btnIndex)
				return css`
					background-color: #6666ff;
				`;
		}};
	}

	${(props) => {
		if (props.index === props.btnIndex)
			return css`
				background-color: #6666ff;
			`;
	}};

	transition: background-color 0.2s;
`;

export const Text = styled.p`
	font-size: 18px;
	text-align: center;
	-webkit-user-select: none;
	user-select: none;
`;

export const WeatherCocktail = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 300px;
	height: auto;
	margin: 0px;
	float: left;
	border: solid;
	border-radius: 10px;
	border-color: black;
	overflow-x: hidden;
	overflow-y: hidden;
`;

export const WeatherCocktailCard = styled.div`
	width: 300px;
	height: auto;
	margin: 0px;
	transition: all ease-in-out 0.5s;

	${(props) => {
		if (props.cardIndex == 0)
			return css`
				margin-left: ${(props) => props.index * -300}px;
			`; // 맨 왼쪽에 있는 카드만 margin-left 적용
	}};
`;

export const UserRecommand = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: auto;
	height: auto;
	border: solid;
	border-radius: 10px;
	border-color: black;
	margin: 0px 0px 0px 20px;
`;

export const UserRecommandInfoBox = styled.div`
	width: auto;
	height: 50px;
	margin: 5px;
	padding: auto 10px;
	border: solid;
	border-radius: 5px;
	border-color: black;
`;

export const UserRecommandInfo = styled.p`
	text-justify: center;
	font-size: 18px;
	margin: 10px;
`;

export const UserRecommandCocktail = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 960px;
	height: 503px;
	margin: 5px;
	border: solid;
	border-radius: 0px;
	border-color: black;
	overflow-x: hidden;
	overflow-y: hidden;
`;

export const NormalRecommandCocktail = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	width: auto;
	height: auto;
	margin: 0px 0px 0px 0px;
	border: solid;
	border-radius: 0px;
	border-color: black;
`;

export const Hr = styled.hr`
	margin: 50px 0px 50px 0px;
`;
