import React from "react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../../component/common/sidebar/Sidebar.jsx";
import Modal from "../../component/modal.js";
import Tag from "../../component/common/tag.js";
import useInterval from "../../component/common/UseInterval.js";
import CocktailCard from "../../component/cocktailCard.js";
import plusImage from "../../images/plusButton.png";
import * as home from "./HomeCss.js";
import axios from "axios";

const Home = () => {
	const [weatherScrollIndex, setWeatherScrollIndex] = useState(0);
	const [maxWeatherScrollIndex, setMaxWeatherScrollIndex] = useState(4);
	const [isModal, setIsModal] = useState("true");

	const [currentTagData, setCurrentTagData] = useState([]);

	// Database에서 불러온 cocktailList
	const [cocktailList, setCocktailList] = useState([]);

	useEffect(() => {
		// 처음 페이지 랜더링 될 때 칵테일 id 순으로 불러옴.
		const getAllCocktailById = async (page) => {
			try {
				const response = await axios.get(`http://localhost:8080/?page=${page}`);
				console.log(response.data.content);
				setCocktailList(response.data.content);
				// Handle the cocktail data as needed
			} catch (error) {
				// Handle the error
				console.error(error);
			}
		};

		// 정렬 조건 : 사전 순서
		const getAllCocktailByName = async (page) => {
			try {
				const response = await axios.get(`http://localhost:8080/dictionary?page=${page}`);
				setCocktailList(response.data.content);
				// Handle the cocktail data as needed
			} catch (error) {
				// Handle the error
				console.error(error);
			}
		};

		// 정렬 조건 : 좋아요 많은 순서
		const getAllCocktailByLiked = async (page) => {
			try {
				const response = await axios.get(`http://localhost:8080/liked/?page=${page}`);
				setCocktailList(response.data.content);
				// Handle the cocktail data as needed
			} catch (error) {
				// Handle the error
				console.error(error);
			}
		};

		// 정렬 조건 : 댓글 최신 업데이트 순서
		const getAllCocktailByUpdate = async (page) => {
			try {
				const response = await axios.get(`http://localhost:8080/update/?page=${page}`);
				setCocktailList(response.data.content);
				// Handle the cocktail data as needed
			} catch (error) {
				// Handle the error
				console.error(error);
			}
		};

		getAllCocktailById(0);
	}, [])

	let weatherAutoScroll = useInterval(
		() => onWeatherScrollClick("right"),
		5000
	);

	if (!cocktailList) {
		return null;
	}

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

	const deleteTag = (targetId, mode) => {
		if (mode === "delete" && targetId !== 0) {
			const newData = currentTagData.filter((x) => x.id !== targetId);
			setCurrentTagData(newData);
		}
	};

	const modalOff = (tags) => {
		setIsModal(false);
		setCurrentTagData(tags);
		console.log("Off");
	};

	const modalOn = () => {
		setIsModal(true);
		console.log("On");
	};

	return (
		<home.Entire>
			{isModal === true ? (
				<Modal modalOff={modalOff} parentTag={currentTagData} />
			) : null}
			<Sidebar />
			<home.NonSidebar>
				<home.Explore>
					<home.Search type="text" placeholder="Search"></home.Search>
					<home.TagSearchDiv>
						<home.ModalButton
							onClick={() => {
								modalOn();
							}}
						>
							<home.Image src={plusImage} alt={plusImage} />
						</home.ModalButton>
						<home.TagSearch>
							{currentTagData.map((info, index) => (
								<Tag
									info={info}
									key={index}
									onDelete={deleteTag}
								/>
							))}
						</home.TagSearch>
					</home.TagSearchDiv>
					<home.Sort>
						<home.SortBase selected="selected">
							좋아요가 많은 순서
						</home.SortBase>
						<home.SortBase>최근 업데이트 순서</home.SortBase>
						<home.SortBase>사전 순서</home.SortBase>
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
