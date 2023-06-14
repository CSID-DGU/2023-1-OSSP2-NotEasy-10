import React, { useContext, useReducer } from "react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../../component/common/sidebar/Sidebar.jsx";
import Modal from "../../component/modal.js";
import Tag from "../../component/common/tag.js";
import useInterval from "../../component/common/UseInterval.js";
import CocktailCard from "../../component/cocktailCard.js";
import plusImage from "../../images/plusButton.png";
import blackXImage from "../../images/blackXButton.png";
import weatherLoadingImage from "../../images/loading.png";
import * as home from "./HomeCss.js";
import * as auth from "../../jwt/auth-context.js";
import axios from "axios";
import AuthContext from "../../jwt/auth-context";
import { GET, POST, PUT, DELETE } from "../../jwt/fetch-auth-action";
import { createTokenHeader } from "../../jwt/auth-action";
import { getCurrentWeatherData } from "../../Weather";

const Home = () => {
	const [weatherScrollIndex, setWeatherScrollIndex] = useState(0);
	const [maxWeatherScrollIndex, setMaxWeatherScrollIndex] = useState(4);
	const [isModal, setIsModal] = useState("true");

	const [currentTagData, setCurrentTagData] = useState([]);

	// Database에서 불러온 cocktailList
	const [cocktailList, setCocktailList] = useState([]);
	const [weatherCocktailList, setWeatherCocktailList] = useState([]);
	const [userCocktailList, setUserBasedCocktailList] = useState([]);

	const [page, setPage] = useState(0);
	const [maxPage, setMaxPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [isWeatherLoading, setIsWeatherLoading] = useState(true);
	const port = 8080;
	const [sortType, setSortType] = useState(0);
	const [searchText, setSearchText] = useState();
	const [searchLogic, setSearchLogic] = useState("AND");
	const [searchMode, setSearchMode] = useState("태그 검색");

	const [weatherTemp, setWeatherTemp] = useState(0);
	const [weatherisRainy, setWeatherisRainy] = useState(0);

	const authCtx = useContext(AuthContext);
	let isLogin = authCtx.isLoggedIn;
	let isGetUser = authCtx.isGetUserSuccess;

	useEffect(() => {
		if (isLogin) {
			authCtx.getUser();
		}
	}, [isLogin]);

	useEffect(() => {
		if (isGetUser) {
			getUserCocktailData();
			getWeatherCocktailData();
		} else {
			getNowPositionWeatherCocktailData();
		}
	}, [isGetUser]);

	useEffect(() => {
		sort(currentTagData, sortType);
	}, [page]);

	useEffect(() => {
		sort(currentTagData, 4);
	}, [searchText]);

	useEffect(() => {
		sort(currentTagData, sortType);
	}, []);

	useEffect(() => {
		setPage(0);
	}, [sortType, searchLogic, currentTagData, searchText]);

	useEffect(() => {
		const scroll = document.getElementById("NonExplore");
		scroll.scrollTop = 0;
		window.scrollTo(0, 0);
	}, [cocktailList]);

	const getAllCocktailById = async (page) => {
		const allCocktailData = GET(
			`https://3.35.180.1:${port}/?page=${page}`,
			createTokenHeader(authCtx.token)
		);
		allCocktailData.then((result) => {
			if (result !== null) {
				const allCocktailData = result.data;
				setCocktailList(allCocktailData.content);
				setMaxPage(allCocktailData.totalPages);
				setIsLoading(false);
			}
		});
	};

	const getAllCocktailByDegree = async (page, alcoholDegree) => {
		let minDegree = alcoholDegree;
		let maxDegree = parseInt(alcoholDegree) + parseInt(5);

		if (minDegree === 40) {
			maxDegree = 100;
		}

		console.log(minDegree);

		const allCocktailData = GET(
			`https://3.35.180.1:${port}/cocktail/degree/${minDegree}/${maxDegree}?page=${page}`,
			createTokenHeader(authCtx.token)
		);
		allCocktailData.then((result) => {
			if (result !== null) {
				const allCocktailData = result.data;
				setCocktailList(allCocktailData.content);
				setMaxPage(allCocktailData.totalPages);
				setIsLoading(false);
			}
		});
	};

	const getNowPositionWeatherCocktailData = async () => {
		navigator.geolocation.getCurrentPosition((position) => {
			let nowTemp = 0;
			let nowIsRainy = 0;

			const lat = position.coords.latitude;
			const lon = position.coords.longitude;

			const data = getCurrentWeatherData(lat, lon);
			data.then((result) => {
				if (result !== null) {
					const weatherData = result.data;
					nowTemp = Number(weatherData.main.temp) - 273.15;
					if (
						weatherData.weather[0].main === "Rain" ||
						weatherData.weather[0].main === "Drizzle" ||
						weatherData.weather[0].description.includes("rain")
					) {
						nowIsRainy = 1;
					}

					console.log(weatherData.weather[0].main);
					console.log(weatherData.weather[0].description);
					console.log("현재 온도 : " + nowTemp);
					console.log("현재 강우 여부 : " + nowIsRainy);

					getNowWeatherCocktailData(nowTemp, nowIsRainy);

					setWeatherTemp((prevState) => {
						return nowTemp;
					});
					setWeatherisRainy((prevState) => {
						return nowIsRainy;
					});
				}
			});
			setIsWeatherLoading(false);
		});
	};

	const getNowWeatherCocktailData = async (temp, isRainy) => {
		// console.log("온도 : " + temp);
		// console.log("강우 여부 : " + isRainy);
		const weatherCocktailData = GET(
			`https://3.35.180.1:${port}/cocktail/weather/now?temp=${temp}&isRainy=${isRainy}`,
			createTokenHeader(authCtx.token)
		);
		weatherCocktailData.then((result) => {
			if (result !== null) {
				const nowWeatherCocktailData = result.data;
				setWeatherCocktailList(result.data);
				// setNowWeatherCocktailList(nowWeatherCocktailData.content);
				setIsLoading(false);
				console.log(
					"실시간 위치 기반 날씨 기반 칵테일 : " + result.data
				);
				result.data.forEach((cocktail) => console.log(cocktail));
			}
		});
	};

	const getWeatherCocktailData = async () => {
		const weatherCocktailData = GET(
			`https://3.35.180.1:${port}/cocktail/weather`,
			createTokenHeader(authCtx.token)
		);
		weatherCocktailData.then((result) => {
			if (result !== null) {
				setWeatherCocktailList(result.data);
				// setWeatherCocktailList(nowWeatherCocktailData.content);
				setIsLoading(false);
				console.log("회원가입 저장 날씨 기반 칵테일 : " + result.data);
				result.data.forEach((cocktail) => console.log(cocktail));
			}
			setIsWeatherLoading(false);
		});
	};

	const getUserCocktailData = async () => {
		const userCocktailData = GET(
			`https://3.35.180.1:${port}/cocktail/prefer/${authCtx.userObj.username}`,
			createTokenHeader(authCtx.token)
		);
		userCocktailData.then((result) => {
			if (result !== null) {
				setUserBasedCocktailList(result.data);
				// console.log("유저 선호 칵테일 : " + result.data);
				// result.data.forEach(cocktail => console.log(cocktail));
			}
		});
	};

	// 정렬 조건 : 사전 순서
	const getAllCocktailByName = async (page) => {
		try {
			const response = await axios.get(
				`https://3.35.180.1:${port}/dictionary?page=${page}`
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

	// 정렬 조건 : 좋아요 많은 순서
	const getAllCocktailByLiked = async (page) => {
		try {
			const response = await axios.get(
				`https://3.35.180.1:${port}/liked?page=${page}`
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
				`https://3.35.180.1:${port}/update?page=${page}`
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
				`https://3.35.180.1:${port}/cocktail/search/${name}?page=${page}`
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
		console.log(tagData.length);
		if (tagData.length === 0) {
			getAllCocktailById(page);
			return;
		}
		try {
			const tags =
				Array.isArray(tagData) && !tagData.length
					? "tags="
					: tagData
							.map((tag) => `tags=${encodeURIComponent(tag)}`)
							.join("&");
			// console.log(tags);
			const response = await axios.get(
				`https://3.35.180.1:${port}/cocktail/tag/and?${tags}&page=${page}`
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
				`https://3.35.180.1:${port}/cocktail/tag/or?${tags}&page=${page}`
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
					key={i}
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
			if (weatherCocktailList.length > i) {
				result.push(
					<home.WeatherCocktailCard
						index={weatherScrollIndex}
						cardIndex={i}
						key={i}
					>
						<CocktailCard
							info={weatherCocktailList[i]}
							key={weatherCocktailList[i].id + 1000000}
						/>
					</home.WeatherCocktailCard>
				);
			}
		}
		return result;
	}

	function weatherLoading() {
		let result = [];
		for (let i = 0; i < 1; i++) {
			result.push(
				<home.WeatherLoading>
					<home.WeatherLoadingImage
						src={weatherLoadingImage}
						alt={weatherLoadingImage}
					/>
				</home.WeatherLoading>
			);
		}
		return result;
	}

	function userCocktailCard(props) {
		if (userCocktailList == undefined) {
			return;
		}
		let result = [];

		if (userCocktailList.length === 1) {
			result.push(
				<div
					style={{
						width: "50vw",
						height: "calc(75vh - 250px)",
						display: "flex",
						justifyContent: "center",
						alignContent: "center",
					}}
				>
					<span
						style={{
							fontSize: "30px",
							marginTop: "calc(37.5vh - 175px)",
						}}
					>
						선호하는 태그를 설정하면 맞춤 추천이 가능합니다!
					</span>
				</div>
			);
		} else {
			for (let i = 0; i < props.amount; i++) {
				if (userCocktailList.length > i) {
					result.push(
						<CocktailCard
							horizontalMargin={props.hMargin + "px"}
							verticalMargin={props.vMargin + "px"}
							info={userCocktailList[i]}
							key={userCocktailList[i].id}
						/>
					);
				} else {
					result.push(
						<home.WeatherLoading>
							<home.WeatherLoadingImage
								src={weatherLoadingImage}
								alt={weatherLoadingImage}
							/>
						</home.WeatherLoading>
					);
				}
			}
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
						key={cocktailList[i].id}
					/>
				);
		}
		if (cocktailList.length === 0) {
			result.push(
				<span style={{ marginTop: "100px", fontSize: "30px" }}>
					조건에 맞는 칵테일이 없습니다!
				</span>
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

	const onWeatherSortChanged = (e) => {
		if (isWeatherLoading) return;
		setIsWeatherLoading(true);
		console.log("바뀜");
		if (e.target.value === "사용자 위치 기반") {
			getWeatherCocktailData();
		} else {
			getNowPositionWeatherCocktailData();
		}
	};

	const onSortChanged = (e) => {
		let sortType = 0;
		switch (e.target.value) {
			case "좋아요 순으로 정렬":
				sortType = 1;
				break;
			case "최근 업데이트 순서":
				sortType = 2;
				break;
			case "사전 순으로 정렬":
				sortType = 3;
				break;
			case "AND":
				sortType = 5;
				break;
			case "OR":
				sortType = 6;
				break;
			case "도수 범위로 검색":
				sortType = 8;
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
				if (tags.length === 0) {
					getAllCocktailById(page);
				} else {
					getCocktailByTagAnd(page, tempTags);
				}
				break;
			case 6:
				if (tags.length === 0) {
					getAllCocktailById(page);
				} else {
					getCocktailByTagOr(page, tempTags);
				}
				break;
			case 7:
				if (tags.length === 0) {
					getAllCocktailById(page);
				} else {
					if (searchLogic === "AND") {
						getCocktailByTagAnd(page, tempTags);
					} else {
						getCocktailByTagOr(page, tempTags);
					}
				}
				break;
			case 8:
				getAllCocktailByDegree(page, 0);
				break;
		}
		setSortType(realSortType);
		console.log("sortType : " + sortType);
		// console.log(cocktailList);
	}

	function pageScrollIndexButton() {
		let result = [];
		result.push(
			<>
				<home.PageScrollIndex
					page={page}
					btnIndex={0}
					key={-1}
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
					key={i}
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
					key={maxPage}
					onClick={() => {
						{
							setPage(maxPage - 1);
						}
					}}
				>
					<home.Text>{maxPage}</home.Text>
				</home.PageScrollIndex>
			</>
		);
		return result;
	}

	function searchUI() {
		let result = [];
		if (searchMode === "단어 검색") {
			result.push(
				<>
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
				</>
			);
		} else if (searchMode === "태그 검색") {
			result.push(
				<home.TagSearchDiv>
					<home.SearchOption
						onChange={(e) => {
							onSortChanged(e);
							setSearchLogic(e.target.value);
						}}
					>
						<home.SearchOptionBase>AND</home.SearchOptionBase>
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
							<Tag info={info} key={index} onDelete={deleteTag} />
						))}
					</home.TagSearch>
				</home.TagSearchDiv>
			);
		} else if (searchMode === "좋아요 순으로 정렬") {
			result.push();
		} else if (searchMode === "사전 순으로 정렬") {
			result.push();
		} else if (searchMode === "도수 범위로 검색") {
			result.push(
				<>
					<home.Sort
						onChange={(e) => {
							// sort(currentTagData, 8);
							setSortType(8);
							getAllCocktailByDegree(page, e.target.value);
						}}
					>
						<home.SortBase value="0">
							0도 이상, 5도 이하
						</home.SortBase>
						<home.SortBase value="5">
							5도 이상, 10도 이하
						</home.SortBase>
						<home.SortBase value="10">
							10도 이상, 15도 이하
						</home.SortBase>
						<home.SortBase value="15">
							15도 이상, 20도 이하
						</home.SortBase>
						<home.SortBase value="20">
							20도 이상, 25도 이하
						</home.SortBase>
						<home.SortBase value="25">
							25도 이상, 30도 이하
						</home.SortBase>
						<home.SortBase value="30">
							30도 이상, 35도 이하
						</home.SortBase>
						<home.SortBase value="35">
							35도 이상, 40도 이하
						</home.SortBase>
						<home.SortBase value="40">40도 이상</home.SortBase>
					</home.Sort>
				</>
			);
		}
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
					<home.Sort
						onChange={(e) => {
							onSortChanged(e);
							setSearchMode(e.target.value);
						}}
					>
						<home.SortBase>단어 검색</home.SortBase>
						<home.SortBase selected>태그 검색</home.SortBase>
						<home.SortBase>좋아요 순으로 정렬</home.SortBase>
						<home.SortBase>사전 순으로 정렬</home.SortBase>
						<home.SortBase>도수 범위로 검색</home.SortBase>
					</home.Sort>
					<home.SearchUI>{searchUI()}</home.SearchUI>
				</home.Explore>
				<home.NonExplore id="NonExplore">
					{isLogin &&
					page === 0 &&
					(sortType <= 3 || sortType == 8) ? (
						<home.LoginContent>
							<home.WeatherNUserCocktail>
								<home.Weather>
									<home.WeatherInfoBox>
										<home.WeatherInfo>
											{"날씨 기반 칵테일 추천 : "}
											{weatherTemp.toFixed(1)}°C,{" "}
											{weatherisRainy === 1
												? "비"
												: "맑음"}
										</home.WeatherInfo>
										<home.WeatherSearchOption
											onChange={(e) =>
												onWeatherSortChanged(e)
											}
										>
											<home.WeatherSearchOptionBase>
												사용자 위치
											</home.WeatherSearchOptionBase>
											<home.WeatherSearchOptionBase>
												현재 위치
											</home.WeatherSearchOptionBase>
										</home.WeatherSearchOption>
									</home.WeatherInfoBox>
									<home.WeatherCarousel>
										<home.WeatherCocktail>
											{weatherCocktailList.length > 0
												? weatherScrollCocktailCard()
												: weatherLoading()}
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
													onWeatherScrollClick(
														"right"
													)
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
											사용자 기반 칵테일 추천
											{/*인생은 마치 칵테일처럼, 적절한 양의
											조합과 꾸미기가 중요하다. -ChatGPT*/}
										</home.UserRecommandInfo>
									</home.UserRecommandInfoBox>
									<home.UserRecommandCocktail>
										{userCocktailCard({
											amount: 3,
											hMargin: 10,
											vMargin: 0,
										})}
									</home.UserRecommandCocktail>
								</home.UserRecommand>
							</home.WeatherNUserCocktail>
							<home.Hr></home.Hr>
						</home.LoginContent>
					) : null}

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
