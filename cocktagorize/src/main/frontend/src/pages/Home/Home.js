import React from "react";
import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Sidebar from "../../component/common/sidebar/Sidebar.jsx";
import Modal from "../../component/modal.js";
import Tag from "../../component/common/tag.js";
import useInterval from "../../component/common/UseInterval.js";
import CocktailCard from "../../component/cocktailCard.js";
import * as home from "./HomeCss.js";
import TagSearch from "../../component/TagSearch.js";

const Home = () => {
	const [weatherScrollIndex, setWeatherScrollIndex] = useState(0);
	const [maxWeatherScrollIndex, setMaxWeatherScrollIndex] = useState(4);
	const [isModal, setIsModal] = useState("false");

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
				<home.WeatherScrollIndex
					index={weatherScrollIndex}
					btnIndex={i}
					onClick={() => setWeatherScrollIndex(i)}
				>
					<home.Text>{i + 1}</home.Text>
				</home.WeatherScrollIndex>
			);
		}
		return result;
	}

	function weatherScrollCocktailCard() {
		let result = [];
		for (let i = 0; i < 5; i++) {
			result.push(
				<home.WeatherCocktailCard
					index={weatherScrollIndex}
					cardIndex={i}
				>
					<CocktailCard />
				</home.WeatherCocktailCard>
			);
		}
		return result;
	}

	function cocktailCard(props) {
		let result = [];
		for (let i = 0; i < props.amount; i++) {
			result.push(
				<CocktailCard
					horizontalMargin={props.hMargin + "px"}
					verticalMargin={props.vMargin + "px"}
				/>
			);
		}
		return result;
	}

	return (
		<home.Entire>
			<Sidebar />
			<home.NonSidebar>
				<home.Explore>
					<home.Search type="text" placeholder="Search"></home.Search>
					<TagSearch />
					<home.Sort>
						<home.SortBase selected="selected">
							당신에게 추천하는 칵테일
						</home.SortBase>
						<home.SortBase>사람들이 좋아하는 칵테일</home.SortBase>
						<home.SortBase>
							최근에 댓글이 올라온 칵테일
						</home.SortBase>
					</home.Sort>
				</home.Explore>
				<home.NonExplore>
					<home.WeatherNUserCocktail>
						<home.Weather>
							<home.WeatherInfoBox>
								<home.WeatherInfo>
									비가 많이 와요!
								</home.WeatherInfo>
							</home.WeatherInfoBox>
							<home.WeatherCarousel>
								<home.WeatherCocktail>
									{weatherScrollCocktailCard()}
								</home.WeatherCocktail>
								<home.WeatherScroll>
									<home.WeatherScrollArrow
										onClick={() =>
											onWeatherScrollClick("left")
										}
									>
										<home.Text>◀</home.Text>
									</home.WeatherScrollArrow>
									{weatherScrollIndexButton()}
									<home.WeatherScrollArrow
										onClick={() =>
											onWeatherScrollClick("right")
										}
									>
										<home.Text>▶</home.Text>
									</home.WeatherScrollArrow>
								</home.WeatherScroll>
							</home.WeatherCarousel>
						</home.Weather>
						<home.UserRecommand>
							<home.UserRecommandInfoBox>
								<home.UserRecommandInfo>
									인생은 마치 칵테일처럼, 적절한 양의 조합과
									꾸미기가 중요하다. -ChatGPT
								</home.UserRecommandInfo>
							</home.UserRecommandInfoBox>
							<home.UserRecommandCocktail>
								{cocktailCard({
									amount: 3,
									hMargin: 10,
									vMargin: 0,
								})}
							</home.UserRecommandCocktail>
						</home.UserRecommand>
					</home.WeatherNUserCocktail>
					<home.Hr></home.Hr>
					<home.NormalRecommandCocktail>
						{cocktailCard({
							amount: 16,
							hMargin: 20,
							vMargin: 20,
						})}
					</home.NormalRecommandCocktail>
				</home.NonExplore>
			</home.NonSidebar>
		</home.Entire>
	);
};

export default Home;
