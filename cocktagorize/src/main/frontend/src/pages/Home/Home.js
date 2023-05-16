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

	const [page, setPage] = useState(0);
	const [maxPage, setMaxPage] = useState(1);
	const [sortType, setSortType] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const port = 8080;

	useEffect(() => {
		// page는 0부터 시작 -> 사용자한테 보여지는 1 page = 받아온 data 0 page
		// 따라서 함수를 호출 할 때 page 매개 변수의 값이 0이면은 사용자에게 보여지는 1 page 의 정보를 갖고오는 것

		// 처음 페이지 랜더링 될 때 칵테일 id 순으로 불러옴

		getAllCocktailById(page);
	}, []);
	const getAllCocktailById = async (page) => {
		try {
			const response = await axios.get(
				`http://localhost:${port}/?page=${page}`
			);
			// data에 전체 페이지에 대한 정보가 나와요! (totalElemets : 보내진 칵테일의 수, totalPages: 전체 페이지 수)
			console.log(response.data);
			setCocktailList(response.data.content);
			setMaxPage(response.data.totalPages);
			//setIsLoading(false);
			// Handle the cocktail data as needed
		} catch (error) {
			// Handle the error
			console.error(error);
		}
	};

	// 정렬 조건 : 사전 순서
	const getAllCocktailByName = async (page) => {
		try {
			const response = await axios.get(
				`http://localhost:${port}/dictionary?page=${page}`
			);
			// data에 전체 페이지에 대한 정보가 나와요! (totalElemets : 보내진 칵테일의 수, totalPages: 전체 페이지 수)
			console.log(response.data);
			setCocktailList(response.data.content);
			setMaxPage(response.data.totalPages);
			setIsLoading(false);
			// Handle the cocktail data as needed
		} catch (error) {
			// Handle the error
			console.error(error);
		}
	};

	// 정렬 조건 : 좋아요 많은 순서
	const getAllCocktailByLiked = async (page) => {
		try {
			const response = await axios.get(
				`http://localhost:${port}/liked?page=${page}`
			);
			// data에 전체 페이지에 대한 정보가 나와요! (totalElemets : 보내진 칵테일의 수, totalPages: 전체 페이지 수)
			console.log(response.data);
			setCocktailList(response.data.content);
			setMaxPage(response.data.totalPages);
			setIsLoading(false);
			// Handle the cocktail data as needed
		} catch (error) {
			// Handle the error
			console.error(error);
		}
	};

	// 정렬 조건 : 댓글 최신 업데이트 순서
	const getAllCocktailByUpdate = async (page) => {
		try {
			const response = await axios.get(
				`http://localhost:${port}/update?page=${page}`
			);
			// data에 전체 페이지에 대한 정보가 나와요! (totalElemets : 보내진 칵테일의 수, totalPages: 전체 페이지 수)
			console.log(response.data);
			setCocktailList(response.data.content);
			setMaxPage(response.data.totalPages);
			setIsLoading(false);
			// Handle the cocktail data as needed
		} catch (error) {
			// Handle the error
			console.error(error);
		}
	};

	// 이름으로 검색하기
	const getCocktailBySearchName = async (name, page) => {
		try {
			const response = await axios.get(
				`http://localhost:${port}/cocktail/search/${name}?page=${page}`
			);
			// data에 전체 페이지에 대한 정보가 나와요! (totalElemets : 보내진 칵테일의 수, totalPages: 전체 페이지 수)
			console.log(response.data);
			setCocktailList(response.data.content);
			setMaxPage(response.data.totalPages);
			setIsLoading(false);
			// Handle the cocktail data as needed
		} catch (error) {
			// Handle the error
			console.error(error);
		}
	};

	// 태그로 검색하기 AND 연산
	const getCocktailByTagAnd = async (page) => {
		try {
			const tags =
				Array.isArray(currentTagData) && !currentTagData.length
					? "tags="
					: currentTagData
							.map((tag) => `tags=${encodeURIComponent(tag)}`)
							.join("&");
			const response = await axios.get(
				`http://localhost:${port}/cocktail/tag/and?${tags}&page=${page}`
			);
			// data에 전체 페이지에 대한 정보가 나와요! (totalElemets : 보내진 칵테일의 수, totalPages: 전체 페이지 수)
			console.log(response.data);
			setCocktailList(response.data.content);
			setMaxPage(response.data.totalPages);
			setIsLoading(false);
			// Handle the cocktail data as needed
		} catch (error) {
			// Handle the error
			console.error(error);
		}
	};

	// 태그로 검색하기 OR 연산
	const getCocktailByTagOr = async (page) => {
		try {
			const tags =
				Array.isArray(currentTagData) && !currentTagData.length
					? "tags="
					: currentTagData
							.map((tag) => `tags=${encodeURIComponent(tag)}`)
							.join("&");
			const response = await axios.get(
				`http://localhost:${port}/cocktail/tag/or?${tags}&page=${page}`
			);
			// data에 전체 페이지에 대한 정보가 나와요! (totalElemets : 보내진 칵테일의 수, totalPages: 전체 페이지 수)
			console.log(response.data);
			setCocktailList(response.data.content);
			setMaxPage(response.data.totalPages);
			setIsLoading(false);
			// Handle the cocktail data as needed
		} catch (error) {
			// Handle the error
			console.error(error);
		}
	};
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
					<CocktailCard info={cocktailList[i]} />
				</home.WeatherCocktailCard>
			);
		}
		return result;
	}

	function cocktailCard(props) {
		let result = [];
		for (let i = 0; i < props.amount; i++) {
			if (cocktailList.length > i)
				result.push(
					<CocktailCard
						horizontalMargin={props.hMargin + "px"}
						verticalMargin={props.vMargin + "px"}
						info={cocktailList[i]}
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

	const onSortChanged = (e) => {
		switch (e.target.value) {
			case "좋아요가 많은 순서":
				setSortType(1);
				break;
			case "최근 업데이트 순서":
				setSortType(2);
				break;
			case "사전 순서":
				setSortType(3);
				break;
			default:
				setSortType(0);
		}
		sort();
	};

	const sort = () => {
		setIsLoading(true);

		switch (sortType) {
			case 0:
				getAllCocktailById(page);
				break;
			case 1:
				getAllCocktailByLiked(page);
				break;
			case 2:
				getAllCocktailByUpdate(page);
				break;
			case 3:
				getAllCocktailByName(page);
				break;
			case 4:
				getCocktailBySearchName(page);
				break;
		}
	};

	function pageScrollIndexButton() {
		let result = [];
		result.push(
			<>
				<home.PageScrollIndex
					page={page}
					btnIndex={0}
					onClick={() => {
						setPage(0);
						sort();
					}}
				>
					<home.Text>{1}</home.Text>
				</home.PageScrollIndex>
				<home.Text>...</home.Text>
			</>
		);
		for (let i = page - 5; i <= page + 5; i++) {
			if (i < 0 || i >= maxPage) continue;
			result.push(
				<home.PageScrollIndex
					page={page}
					btnIndex={i}
					onClick={() => {
						setPage(i);
						sort();
					}}
				>
					<home.Text>{i + 1}</home.Text>
				</home.PageScrollIndex>
			);
		}
		result.push(
			<>
				<home.Text>...</home.Text>
				<home.PageScrollIndex
					page={page}
					btnIndex={maxPage - 1}
					onClick={() => {
						setPage(maxPage - 1);
						sort();
					}}
				>
					<home.Text>{maxPage}</home.Text>
				</home.PageScrollIndex>
			</>
		);
		return result;
	}

	return (
		<home.Entire>
			{isModal === true ? (
				<Modal modalOff={modalOff} parentTag={currentTagData} />
			) : null}
			<Sidebar />
			<home.NonSidebar>
				<home.Explore>
					<home.Search
						type="text"
						placeholder="Search"
						onChange={(e) =>
							getCocktailBySearchName(e.target.value)
						}
					></home.Search>
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
					<home.Sort onChange={(e) => onSortChanged(e)}>
						<home.SortBase selected="selected">
							좋아요가 많은 순서
						</home.SortBase>
						<home.SortBase>최근 업데이트 순서</home.SortBase>
						<home.SortBase>사전 순서</home.SortBase>
					</home.Sort>
				</home.Explore>
				<home.NonExplore>
					{/*
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
							*/}

					<home.NormalRecommandCocktail>
						{cocktailCard({
							amount: 20,
							hMargin: 20,
							vMargin: 20,
						})}
					</home.NormalRecommandCocktail>
					{/*isLoading ? <home.Loading></home.Loading> : null*/}
				</home.NonExplore>

				<home.PageScroll>{pageScrollIndexButton()}</home.PageScroll>
			</home.NonSidebar>
		</home.Entire>
	);
};

export default Home;
