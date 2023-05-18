import React, {useContext, useReducer} from "react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../../component/common/sidebar/Sidebar.jsx";
import Modal from "../../component/modal.js";
import Tag from "../../component/common/tag.js";
import useInterval from "../../component/common/UseInterval.js";
import CocktailCard from "../../component/cocktailCard.js";
import plusImage from "../../images/plusButton.png";
import blackXImage from "../../images/blackXButton.png";
import * as home from "./HomeCss.js";
import axios from "axios";
import AuthContext from "../../jwt/auth-context";

const Home = () => {
	const authCtx = useContext(AuthContext);
	const [weatherScrollIndex, setWeatherScrollIndex] = useState(0);
	const [maxWeatherScrollIndex, setMaxWeatherScrollIndex] = useState(4);
	const [isModal, setIsModal] = useState("true");

	const [currentTagData, setCurrentTagData] = useState([]);

	// Database에서 불러온 cocktailList
	const [cocktailList, setCocktailList] = useState([]);

	const [page, setPage] = useState(0);
	const [maxPage, setMaxPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const port = 8080;
	const [sortType, setSortType] = useState(0);
	const [searchText, setSearchText] = useState();
	const [searchMode, setSearchMode] = useState("AND");

	useEffect(() => {
		sort(currentTagData, sortType);
	}, [page, sortType]);

	useEffect(() => {
		sort(currentTagData, 4);
	}, [searchText]);

	useEffect(() => {
		// page는 0부터 시작 -> 사용자한테 보여지는 1 page = 받아온 data 0 page
		// 따라서 함수를 호출 할 때 page 매개 변수의 값이 0이면은 사용자에게 보여지는 1 page 의 정보를 갖고오는 것

		// 처음 페이지 랜더링 될 때 칵테일 id 순으로 불러옴
		if (authCtx.isLoggedIn) authCtx.getUser();
		sort(currentTagData, sortType);
	}, []);

	const getAllCocktailById = async (page) => {
		try {
			const response = await axios.get(
				`http://localhost:${port}/?page=${page}`
			);
			// data에 전체 페이지에 대한 정보가 나와요! (totalElemets : 보내진 칵테일의 수, totalPages: 전체 페이지 수)
			// console.log(response.data);
			setCocktailList(response.data.content);
			setMaxPage(response.data.totalPages);
			setIsLoading(false);
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
		if (name === "") {
			getAllCocktailById(page);
			return;
		}
		try {
			const response = await axios.get(
				`http://localhost:${port}/cocktail/search/${name}?page=${page}`
			);
			// data에 전체 페이지에 대한 정보가 나와요! (totalElemets : 보내진 칵테일의 수, totalPages: 전체 페이지 수)
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
	const getCocktailByTagAnd = async (page, tagData) => {
		try {
			const tags =
				Array.isArray(tagData) && !tagData.length
					? "tags="
					: tagData
							.map((tag) => `tags=${encodeURIComponent(tag)}`)
							.join("&");
			// console.log(tags);
			const response = await axios.get(
				`http://localhost:${port}/cocktail/tag/and?${tags}&page=${page}`
			);
			// data에 전체 페이지에 대한 정보가 나와요! (totalElemets : 보내진 칵테일의 수, totalPages: 전체 페이지 수)
			// console.log(response.data);
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
	const getCocktailByTagOr = async (page, tagData) => {
		try {
			const tags =
				Array.isArray(tagData) && !tagData.length
					? "tags="
					: tagData
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
			sort(newData, 7);
		}
	};

	const modalOff = (tags) => {
		setIsModal(false);
		setCurrentTagData(tags);
		sort(tags, 7);
	};

	const modalOn = () => {
		setIsModal(true);
	};

	const onSortChanged = (e) => {
		let sortType = 0;
		switch (e.target.value) {
			case "좋아요가 많은 순서":
				sortType = 1;
				break;
			case "최근 업데이트 순서":
				sortType = 2;
				break;
			case "사전 순서":
				sortType = 3;
				break;
			case "AND":
				sortType = 5;
				break;
			case "OR":
				sortType = 6;
				break;
			default:
				sortType = 0;
		}
		sort(currentTagData, sortType);
	};

	function sort(tags, type) {
		setIsLoading(true);
		let tempTags = [];
		tags.map((tag) => tempTags.push(tag.name));
		let realSortType = type;
		if (type === -1) realSortType = sortType;
		switch (realSortType) {
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
				getCocktailBySearchName(searchText, page);
				break;
			case 5:
				getCocktailByTagAnd(page, tempTags);
				break;
			case 6:
				getCocktailByTagOr(page, tempTags);
				break;
			case 7:
				if (searchMode === "AND") {
					getCocktailByTagAnd(page, tempTags);
				} else {
					getCocktailByTagOr(page, tempTags);
				}
				break;
		}
		setSortType(realSortType);
		// console.log("sortType : " + sortType);
		// console.log(cocktailList);
	}

	function pageScrollIndexButton() {
		let result = [];
		result.push(
			<>
				<home.PageScrollIndex
					page={page}
					btnIndex={0}
					onClick={() => {
						setPage(0);
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
						onChange={(e) => setSearchText(e.target.value)}
						value={searchText}
					></home.Search>
					<home.blackXButton
						src={blackXImage}
						onClick={() => {
							setSortType(0);
							setSearchText("");
						}}
					/>
					<home.TagSearchDiv>
						<home.SearchOption
							onChange={(e) => {
								onSortChanged(e);
								setSearchMode(e.target.value);
							}}
						>
							<home.SearchOptionBase selected="selected">
								AND
							</home.SearchOptionBase>
							<home.SearchOptionBase>OR</home.SearchOptionBase>
						</home.SearchOption>
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
				</home.NonExplore>

				<home.PageScroll>{pageScrollIndexButton()}</home.PageScroll>
			</home.NonSidebar>
			{/*isLoading ? <home.Loading></home.Loading> : null*/}
		</home.Entire>
	);
};

export default Home;
