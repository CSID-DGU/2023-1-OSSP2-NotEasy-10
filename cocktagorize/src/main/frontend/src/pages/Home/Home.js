import React from "react";
import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Sidebar from "../../component/common/sidebar/Sidebar.jsx";
import Modal from "../../component/modal.js";
import Tag from "../../component/common/tag.js";
import useInterval from "../../component/common/UseInterval.js";
import CocktailCard from "../../component/cocktailCard.js";

const Entire = styled.div`
	display: flex;
	flexdirection: row;
`;

const NotSidebar = styled.div`
	display: flex;
	flex-direction: column;
`;

const Explore = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: auto;
	height: 100px;
	margin: 20px 50px 10px 50px;
`;

const Search = styled.input`
	width: 300px;
	height: 50px;
	border-radius: 15px;
	padding: 0px 10px;
	border-color: black;
	font-size: 24px;
`;

const TagSearch = styled.div`
	width: 750px;
	height: 50px;
	background-color: white;
	border: solid;
	border-color: black;
	border-width: 2px;
	border-radius: 15px;
	padding: 5px;
	margin: 0px 10px;
	overflow-x: auto;
	overflow-y: hidden;
	display: flex;
	flex-direction: row;
	align-items: center;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const Sort = styled.select`
	width: 300px;
	height: 50px;
	border-radius: 15px;
	padding: 0px 10px;
	border-color: black;
	font-size: 18px;
`;

const SortBase = styled.option`
	font-size: 18px;
`;

const WeatherNUserCocktail = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: auto;
	height: auto;
	margin: 0px 0px 0px 50px;
	border: solid;
	border-color: black;
	border-width: 2px;
`;

const Weather = styled.div`
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

const WeatherInfoBox = styled.div`
	width: 380px;
	height: 50px;
	margin: 5px;
	padding: auto 10px;
	border: solid;
	border-radius: 5px;
	border-color: black;
`;

const WeatherInfo = styled.p`
	text-justify: center;
	font-size: 18px;
	margin: 10px;
`;

const WeatherCarousel = styled.div`
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

const WeatherScroll = styled.div`
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

const WeatherScrollArrow = styled.div`
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

const WeatherScrollIndex = styled.div`
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

const Text = styled.p`
	font-size: 18px;
	text-align: center;
	-webkit-user-select: none;
	user-select: none;
`;

const WeatherCocktail = styled.div`
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

const WeatherCocktailCard = styled.div`
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

const UserRecommand = styled.div`
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

const UserRecommandInfoBox = styled.div`
	width: auto;
	height: 50px;
	margin: 5px;
	padding: auto 10px;
	border: solid;
	border-radius: 5px;
	border-color: black;
`;

const UserRecommandInfo = styled.p`
	text-justify: center;
	font-size: 18px;
	margin: 10px;
`;

const UserRecommandCocktail = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 960px;
	height: 503px;
	margin: 5px;
	border: solid;
	border-radius: 10px;
	border-color: black;
	overflow-x: hidden;
	overflow-y: hidden;
`;

const Home = () => {
	const [weatherScrollIndex, setWeatherScrollIndex] = useState(0);
	const [maxWeatherScrollIndex, setMaxWeatherScrollIndex] = useState(4);

	let weatherAutoScroll = useInterval(
		() => onWeatherScrollClick("right"),
		5000
	);

	function onWeatherScrollClick(direction) {
		if (direction === "left") {
			if (weatherScrollIndex <= 0) {
				setWeatherScrollIndex(
					(weatherScrollIndex) => maxWeatherScrollIndex
				);
			} else {
				setWeatherScrollIndex(
					(weatherScrollIndex) => weatherScrollIndex - 1
				);
			}
		} else {
			if (weatherScrollIndex >= maxWeatherScrollIndex) {
				setWeatherScrollIndex((weatherScrollIndex) => 0);
			} else {
				setWeatherScrollIndex(
					(weatherScrollIndex) => weatherScrollIndex + 1
				);
			}
		}
	}

	function weatherScrollIndexButton() {
		let result = [];
		for (let i = 0; i < 5; i++) {
			result.push(
				<WeatherScrollIndex
					index={weatherScrollIndex}
					btnIndex={i}
					onClick={() => setWeatherScrollIndex(i)}
				>
					<Text>{i + 1}</Text>
				</WeatherScrollIndex>
			);
		}
		return result;
	}

	function weatherScrollCocktailCard() {
		let result = [];
		for (let i = 0; i < 5; i++) {
			result.push(
				<WeatherCocktailCard index={weatherScrollIndex} cardIndex={i}>
					<CocktailCard />
				</WeatherCocktailCard>
			);
		}
		return result;
	}

	return (
		<Entire>
			<Sidebar />
			<NotSidebar>
				<Explore>
					<Search type="text" placeholder="Search"></Search>
					<TagSearch>
						<Tag name="태그1" />
						<Tag name="태그2" />
						<Tag name="태그3" />
						<Tag name="태그000000000000000000000000000000000000000000000000000000000000" />
					</TagSearch>
					<Sort>
						<SortBase selected="selected">
							당신에게 추천하는 칵테일
						</SortBase>
						<SortBase>사람들이 좋아하는 칵테일</SortBase>
						<SortBase>최근에 댓글이 올라온 칵테일</SortBase>
					</Sort>
				</Explore>
				<WeatherNUserCocktail>
					<Weather>
						<WeatherInfoBox>
							<WeatherInfo>비가 많이 와요!</WeatherInfo>
						</WeatherInfoBox>
						<WeatherCarousel>
							<WeatherCocktail>
								{weatherScrollCocktailCard()}
							</WeatherCocktail>
							<WeatherScroll>
								<WeatherScrollArrow
									onClick={() => onWeatherScrollClick("left")}
								>
									<Text>◀</Text>
								</WeatherScrollArrow>
								{weatherScrollIndexButton()}
								<WeatherScrollArrow
									onClick={() =>
										onWeatherScrollClick("right")
									}
								>
									<Text>▶</Text>
								</WeatherScrollArrow>
							</WeatherScroll>
						</WeatherCarousel>
					</Weather>
					<UserRecommand>
						<UserRecommandInfoBox>
							<UserRecommandInfo>
								인생은 마치 칵테일처럼, 적절한 양의 조합과
								꾸미기가 중요하다. -ChatGPT
							</UserRecommandInfo>
						</UserRecommandInfoBox>
						<UserRecommandCocktail>
							<CocktailCard horizontalMargin="10px" />
							<CocktailCard horizontalMargin="10px" />
							<CocktailCard horizontalMargin="10px" />
						</UserRecommandCocktail>
					</UserRecommand>
				</WeatherNUserCocktail>
			</NotSidebar>
		</Entire>
	);
};

export default Home;
