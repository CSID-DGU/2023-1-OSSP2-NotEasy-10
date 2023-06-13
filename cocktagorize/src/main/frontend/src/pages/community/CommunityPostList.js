import React, { useContext, useReducer } from "react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../../component/common/sidebar/Sidebar.jsx";
import Post from "../../component/Post.js";
import blackXImage from "../../images/blackXButton.png";
import CocktailCard from "../../component/cocktailCard.js";
import * as home from "./CommunityPostListCSS.js";
import axios from "axios";
import { GET } from "../../jwt/fetch-auth-action";
import { createTokenHeader } from "../../jwt/auth-action";
import AuthContext from "../../jwt/auth-context";
import { getNowPositionWeatherCocktailData } from "../Home/Home";

const CommunityPostList = () => {
	const [cocktailList, setCocktailList] = useState([]);

	useEffect(() => {
		getCocktailData();
	}, []);

	const getCocktailData = async () => {
		const userCocktailData = GET(
			`http://localhost:${port}/cocktail/prefer/${authCtx.userObj.username}`,
			createTokenHeader(authCtx.token)
		);
		userCocktailData.then((result) => {
			if (result !== null) {
				setCocktailList(result.data);
				// console.log("유저 선호 칵테일 : " + result.data);
				// result.data.forEach(cocktail => console.log(cocktail));
			}
		});
	};

	const [postList, setPostList] = useState([
		{
			id: 0,
			type: "none",
			title: "불러오기 실패",
			content: "불러오기 실패",
			liked: 0,

			user: {
				id: 0,
				name: "불러오기 실패",
				isLiked: false,
			},

			boardReplyList: [
				{
					id: 0,
					content: "불러오기 실패",
					liked: 0,
					created: "2021-06-01T00:00:00.000+00:00",
					user: {
						id: 0,
						name: "불러오기 실패",
					},
				},
			],

			created: "2021-06-01T00:00:00.000+00:00",
		},
	]);

	const [page, setPage] = useState(0);
	const [maxPage, setMaxPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const port = 8080;
	const [sortType, setSortType] = useState(1);
	const [searchText, setSearchText] = useState();
	const [userCocktailList, setUserBasedCocktailList] = useState([]);

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
			// User 정보를 불러와야지 이 함수를 호출 가능해서 여기다 작성
			getUserCocktailData();
		}
	}, [isGetUser]);

	useEffect(() => {
		switch (sortType) {
			case 1:
				getAllBoards(page);
				break;
			case 2:
				getAllBoardsByDic(page);
				break;
			case 3:
				getAllBoardsByLiked(page);
				break;
			case 4:
				getAllBoardsByTitle(searchText, page);
				break;
			case 5:
				getAllBoardsByContent(searchText, page);
				break;
		}
	}, [page, sortType, searchText]);

	useEffect(() => {
		getAllBoards(0);
		// 사전순으로
		// getAllBoardsByDic(0);
		// getAllBoardsByLiked(0);
		// getAllBoardsByTitle("test", 0);
		// getAllBoardsByContent("될까요?", 0);
	}, []);

	/*
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

		sort(currentTagData, sortType);
	}, []);
*/

	// 게시글 들을 불러오는 함수
	const getAllBoards = async (page) => {
		const boardsData = GET(
			`http://localhost:8080/board?page=${page}`,
			createTokenHeader(authCtx.token)
		);
		boardsData.then((result) => {
			if (result !== null) {
				console.log(
					"id순으로 그냥 불러올 경우 : " + result.data.content
				);
				setPostList(result.data.content);
				setMaxPage(result.data.totalPages);
				setIsLoading(false);
			}
		});
	};

	// 정렬기준 dictionary
	const getAllBoardsByDic = async (page) => {
		const boardsData = GET(
			`http://localhost:8080/board/dictionary?page=${page}`,
			createTokenHeader(authCtx.token)
		);
		boardsData.then((result) => {
			if (result !== null) {
				console.log("사전순으로 불러올 경우 : " + result.data.content);
				setPostList(result.data.content);
				setMaxPage(result.data.totalPages);
				setIsLoading(false);
			}
		});
	};

	// 정렬기준 좋아요 많은 순
	const getAllBoardsByLiked = async (page) => {
		const boardsData = GET(
			`http://localhost:8080/board/liked?page=${page}`,
			createTokenHeader(authCtx.token)
		);
		boardsData.then((result) => {
			if (result !== null) {
				console.log(
					"좋아요 순으로 불러올 경우 : " + result.data.content
				);
				setPostList(result.data.content);
				setMaxPage(result.data.totalPages);
				setIsLoading(false);
			}
		});
	};

	//
	const getAllBoardsByTitle = async (name, page) => {
		if (!name) {
			getAllBoards(page);
			return;
		}
		const nameURL = encodeURI(name);
		const boardsData = GET(
			`http://localhost:8080/board/title/${nameURL}`,
			createTokenHeader(authCtx.token)
		);
		boardsData.then((result) => {
			if (result !== null) {
				console.log("제목으로 불러올 경우 : " + result.data.content);
				setPostList(result.data.content);
				setMaxPage(result.data.totalPages);
				setIsLoading(false);
			}
		});
	};

	const getAllBoardsByContent = async (content, page) => {
		if (!content) {
			getAllBoards(page);
			return;
		}
		const contentURL = encodeURI(content);
		const boardsData = GET(
			`http://localhost:8080/board/content/${contentURL}`,
			createTokenHeader(authCtx.token)
		);
		boardsData.then((result) => {
			if (result !== null) {
				console.log("내용으로 불러올 경우 : " + result.data.content);
				setPostList(result.data.content);
				setMaxPage(result.data.totalPages);
				setIsLoading(false);
			}
		});
	};

	// 사이드에 보여줄 사용자 기반 추천 칵테일
	const getUserCocktailData = async () => {
		const userCocktailData = GET(
			`http://localhost:8080/cocktail/prefer/${authCtx.userObj.username}`,
			createTokenHeader(authCtx.token)
		);
		userCocktailData.then((result) => {
			if (result !== null) {
				console.log("사용자 기반 추천 칵테일 : " + result.data.content);
				setUserBasedCocktailList(result.data);
				setIsLoading(false);
				// console.log("유저 선호 칵테일 : " + result.data);
				// result.data.forEach(cocktail => console.log(cocktail));
			}
		});
	};

	function post(props) {
		let result = [];
		for (let i = 0; i < props.amount; i++) {
			if (postList.length > i)
				result.push(
					<Post
						horizontalMargin={props.hMargin + "px"}
						verticalMargin={props.vMargin + "px"}
						info={postList[i]}
					/>
				);
		}
		return result;
	}
	const onSortChanged = (e) => {
		let sortType = 0;
		switch (e.target.value) {
			case "모든 글":
				sortType = 1;
				break;
			case "사전 순서":
				sortType = 2;
				break;
			case "좋아요가 많은 순서":
				sortType = 3;
				break;
			case "제목 검색":
				sortType = 4;
				break;
			case "내용 검색":
				sortType = 5;
				break;
			default:
				sortType = 0;
		}
		if (sortType <= 3 && searchText !== "") sortType = 4;
		setSortType(sortType);
	};
	/*
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
*/
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
			<Sidebar />
			<home.NonSidebar>
				<home.Explore>
					<home.Sort onChange={(e) => onSortChanged(e)}>
						<home.SortBase>모든 글</home.SortBase>
						<home.SortBase>사전 순서</home.SortBase>
						<home.SortBase>좋아요가 많은 순서</home.SortBase>
						<home.SortBase>제목 검색</home.SortBase>
						<home.SortBase>내용 검색</home.SortBase>
					</home.Sort>
					<home.Search
						type="text"
						placeholder="Search"
						onChange={(e) => setSearchText(e.target.value)}
						value={searchText}
					></home.Search>
					<home.blackXButton
						src={blackXImage}
						onClick={() => {
							setSortType(1);
							setSearchText("");
						}}
					/>
				</home.Explore>
				<home.NonExplore>
					<home.PostList>
						{post({
							amount: 4,
							hMargin: 10,
							vMargin: 10,
						})}
					</home.PostList>
				</home.NonExplore>

				<home.PageScroll>{pageScrollIndexButton()}</home.PageScroll>
			</home.NonSidebar>
			<home.Cocktailbar>
				<CocktailCard
					horizontalMargin={"10px"}
					verticalMargin={"10px"}
					info={cocktailList[0]}
				/>
			</home.Cocktailbar>
		</home.Entire>
	);
};

export default CommunityPostList;
