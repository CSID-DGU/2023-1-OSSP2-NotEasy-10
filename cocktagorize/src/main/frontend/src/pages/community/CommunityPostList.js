import React, { useReducer } from "react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../../component/common/sidebar/Sidebar.jsx";
import Post from "../../component/Post.js";
import blackXImage from "../../images/blackXButton.png";
import CocktailCard from "../../component/cocktailCard.js";
import * as home from "./CommunityPostListCSS.js";
import axios from "axios";

const CommunityPostList = () => {
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
					<home.Sort onChange={(e) => onSortChanged(e)}>
						<home.SortBase selected="selected">
							좋아요가 많은 순서
						</home.SortBase>
						<home.SortBase>최근 업데이트 순서</home.SortBase>
						<home.SortBase>사전 순서</home.SortBase>
					</home.Sort>
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
					//info={cocktailList[i]}
				/>
			</home.Cocktailbar>
		</home.Entire>
	);
};

export default CommunityPostList;
