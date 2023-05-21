import React, { useReducer } from "react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../../component/common/sidebar/Sidebar.jsx";
import * as home from "./FavoritesCSS.js";
import Recipe from "../../component/Recipe.js";
import Post from "../../component/Post.js";
import axios from "axios";

const Favorites = () => {
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

	function post(props) {
		let result = [];
		for (let i = 0; i < props.amount; i++) {
			//if (postList.length > i)
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
							<Recipe
								height={"144px"}
								horizontalMargin={"10px"}
								verticalMargin={"10px"}
							/>
							<Recipe
								height={"144px"}
								horizontalMargin={"10px"}
								verticalMargin={"10px"}
							/>
							<Recipe
								height={"144px"}
								horizontalMargin={"10px"}
								verticalMargin={"10px"}
							/>
						</home.RecipesContent>
					</home.Recipes>
					<home.Vr />
					<home.Posts>
						<home.PostsTitle>Post</home.PostsTitle>
						<home.PostsContent>
							<Post
								width={"25vw"}
								height={"144px"}
								horizontalMargin={"10px"}
								verticalMargin={"10px"}
							/>
							<Post
								width={"25vw"}
								height={"144px"}
								horizontalMargin={"10px"}
								verticalMargin={"10px"}
							/>
							<Post
								width={"25vw"}
								height={"144px"}
								horizontalMargin={"10px"}
								verticalMargin={"10px"}
							/>
						</home.PostsContent>
					</home.Posts>
				</home.Content>
			</home.NonSidebar>
		</home.Entire>
	);
};

export default Favorites;
