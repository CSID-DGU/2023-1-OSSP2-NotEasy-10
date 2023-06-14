import React, { useContext, useReducer } from "react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../../component/common/sidebar/Sidebar.jsx";
import * as home from "./FavoritesCSS.js";
import Recipe from "../../component/Recipe.js";
import Post from "../../component/Post.js";
import axios, { all } from "axios";
import AuthContext from "../../jwt/auth-context";
import { GET } from "../../jwt/fetch-auth-action";
import { createTokenHeader } from "../../jwt/auth-action";
import loadingImage from "../../images/loading.png";

const Favorites = () => {
	const [postList, setPostList] = useState([]);

	const [cocktailList, setCocktailList] = useState([]);

	const [page, setPage] = useState(0);
	const [maxPage, setMaxPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const port = 8080;
	const [sortType, setSortType] = useState(0);
	const [searchText, setSearchText] = useState();

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
			getUserLikedBoardAndCocktails();
		}
	}, [isGetUser]);

	const getUserLikedBoardAndCocktails = async () => {
		const data = GET(
			`https://3.35.180.1:8080/liked-cocktails`,
			createTokenHeader(authCtx.token)
		);
		data.then((result) => {
			if (result !== null) {
				const allCocktailData = result.data;
				console.log(allCocktailData);
				setPostList(allCocktailData.likeBoardList);
				setCocktailList(allCocktailData.likeCocktailList);
				setIsLoading(false);
			}
		});
	};

	function post(props) {
		if (!postList) return;
		let result = [];
		for (let i = 0; i < postList.length; i++) {
			//if (postList.length > i)
			result.push(
				<Post
					width={props.width + "vw"}
					height={props.height + "px"}
					horizontalMargin={props.hMargin + "px"}
					verticalMargin={props.vMargin + "px"}
					info={postList[i]}
				/>
			);
		}

		if (postList.length === 0) {
			result.push(
				<span style={{ marginTop: "30px" }}>
					다른 사람의 글에 좋아요를 눌러보세요!
				</span>
			);
		}
		return result;
	}

	function recipe(props) {
		if (!cocktailList) return;
		let result = [];
		for (let i = 0; i < cocktailList.length; i++) {
			//if (cocktailList.length > i)
			result.push(
				<Recipe
					height={props.height + "px"}
					horizontalMargin={props.hMargin + "px"}
					verticalMargin={props.vMargin + "px"}
					info={cocktailList[i]}
				/>
			);
		}

		if (cocktailList.length === 0) {
			result.push(
				<span style={{ marginTop: "30px" }}>
					칵테일에 좋아요를 눌러보세요!
				</span>
			);
		}
		return result;
	}

	function loading() {
		let result = [];
		for (let i = 0; i < 1; i++) {
			result.push(
				<home.Loading>
					<home.LoadingImage src={loadingImage} alt={loadingImage} />
				</home.Loading>
			);
		}
		return result;
	}

	const onSortChanged = (e) => {
		/*
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
		sort(currentTagData, sortType);*/
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

	return (
		<home.Entire>
			<Sidebar />
			<home.NonSidebar>
				<home.Title>Favorites</home.Title>
				<home.Hr />
				<home.Content>
					<home.Recipes>
						<home.RecipesTitle>Recipe</home.RecipesTitle>
						<home.RecipesContent>
							{isLoading === false
								? recipe({
										height: "144",
										hMargin: "10",
										vMargin: "10",
								  })
								: loading()}
						</home.RecipesContent>
					</home.Recipes>
					<home.Vr />
					<home.Posts>
						<home.PostsTitle>Post</home.PostsTitle>
						<home.PostsContent>
							{isLoading === false
								? post({
										width: "25",
										height: "48",
										hMargin: "10",
										vMargin: "10",
								  })
								: loading()}
						</home.PostsContent>
					</home.Posts>
				</home.Content>
			</home.NonSidebar>
		</home.Entire>
	);
};

export default Favorites;
