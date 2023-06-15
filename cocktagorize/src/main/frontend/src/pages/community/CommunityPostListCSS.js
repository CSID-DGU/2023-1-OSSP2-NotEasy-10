import styled, { css } from "styled-components";

export const Entire = styled.div`
	display: flex;
	flex-direction: row;
`;

export const NonSidebar = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 25px;
	margin-left: 5vw;
	margin-right: 25px;
	width: 45vw;
	height: 80vh;
	align-items: center;
`;

export const PostList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5px;
	margin-left: 25px;
	margin-right: 25px;
	width: 100%;
	height: 100%;
`;

export const NonExplore = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-x: hidden;
	overflow-y: auto;
	width: calc(100% - 0px);
	height: calc(100% - 70px);

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

export const Image = styled.img`
	width: 10px;
	height: 10px;
	margin-top: 2px;
	margin-right: 8px;
	-webkit-user-drag: none;
	-webkit-user-select: none;
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
	width: 24vw;
	height: 50px;
	border-radius: 15px;
	padding: 0px 10px;
	border-color: black;
	font-size: 24px;
	font-family: var(--font-Jua);
	margin: 10px;
`;

export const Sort = styled.select`
	width: 12vw;
	height: 50px;
	border-width: 2px;
	border-radius: 15px;
	padding: 0px 10px;
	border-color: black;
	font-size: 18px;
	font-family: var(--font-Jua);
	margin: 10px;
`;

export const SortBase = styled.option`
	font-size: 18px;
	font-family: var(--font-Jua);
`;

export const SearchOption = styled.select`
	width: 100px;
	height: 30px;
	border-width: 2px;
	border-radius: 15px;
	margin: 0px 5px;
	padding: 0px 10px;
	border-color: black;
	font-size: 18px;
	font-family: var(--font-Jua);
`;

export const SearchOptionBase = styled.option`
	font-size: 18px;
	font-family: var(--font-Jua);
`;

export const PageScroll = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: auto;
	margin-top: 20px;
	padding: 0px;
`;

export const PageScrollIndex = styled.div`
	width: 40px;
	height: 50px;
	margin: 2px;
	padding: 0px;
	border: solid;
	border-color: black;
	border-radius: 10px;
	background-color: white;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: #ccccff;
		${(props) => {
			if (props.page === props.btnIndex)
				return css`
					background-color: #6666ff;
				`;
		}};
	}

	${(props) => {
		if (props.page === props.btnIndex)
			return css`
				background-color: #6666ff;
			`;
	}};

	transition: background-color 0.2s;
`;

export const blackXButton = styled.img`
	width: 15px;
	height: 15px;
	margin-left: -40px;
	margin-right: 20px;
	float: left;
	-webkit-user-drag: none;
	-webkit-user-select: none;
`;

export const Cocktailbar = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 25px;
	margin-left: 2.5vw;
	margin-right: 25px;
	width: 25vw;
	height: 80vh;
	justify-content: center;
	align-items: center;
`;

export const Loading = styled.div`
	width: 15.625vw;
	height: calc(75vh - 270px);
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const LoadingImage = styled.img`
	width: 75px;
	height: 75px;
	-webkit-user-drag: none;
	-webkit-user-select: none;
	animation: rotate_image 1s ease-out infinite;
	transform-origin: 50% 50%;

	@keyframes rotate_image {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export const WeatherSearchOption = styled.select`
	width: 150px;
	height: 30px;
	border-width: 2px;
	border-radius: 15px;
	margin: 0px 5px;
	padding: 0px 10px;
	border-color: black;
	font-size: 12px;
	font-family: var(--font-Jua);
`;

export const WeatherSearchOptionBase = styled.option`
	font-size: 12px;
	font-family: var(--font-Jua);
`;

export const LoginContent = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: auto;
	align-items: center;
`;

export const WeatherNUserCocktail = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: calc(100% - 10px);
	height: auto;
	margin: 0px 0px 0px 0px;
`;

export const Weather = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: auto;
	height: auto;
	margin: 0px 10px;
`;

export const WeatherInfoBox = styled.div`
	width: calc(15.625vw + 10px);
	height: auto;
	margin: 10px 20px;
	padding: auto 10px;
	border: solid;
	border-radius: 5px;
	border-color: black;
	display: flex;
	flex-direction: row;
	align-items: center;
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
	width: calc(15.625vw + 6px);
	height: auto;
	margin: 0px 40px;
	padding: 0px;
`;

export const WeatherScroll = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: auto;
	margin: 0px;
	padding: 0px;
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

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

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

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

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
	width: 100%;
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
	width: 15.625vw;
	height: calc(75vh - 270px);
	margin: 0px;
	transition: margin ease-in-out 0.5s;

	${(props) => {
		if (props.cardIndex == 0)
			return css`
				margin-left: ${(props) => props.index * -15.625}vw;
			`; // 맨 왼쪽에 있는 카드만 margin-left 적용
	}};
`;

export const WeatherLoading = styled.div`
	width: 15.625vw;
	height: calc(75vh - 270px);
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	z-index: 10;
`;

export const WeatherLoadingImage = styled.img`
	width: 75px;
	height: 75px;
	-webkit-user-drag: none;
	-webkit-user-select: none;
	animation: rotate_image 1s ease-out infinite;
	transform-origin: 50% 50%;

	@keyframes rotate_image {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
