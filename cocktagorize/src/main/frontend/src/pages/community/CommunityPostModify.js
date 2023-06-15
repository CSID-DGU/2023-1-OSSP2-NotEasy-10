import React, { useContext, useEffect, useState } from "react";
import "./CommunityPostModify.css";
import Sidebar from "../../component/common/sidebar/Sidebar";
import CocktailCard from "../../component/cocktailCard";
import { DELETE, GET, PUT } from "../../jwt/fetch-auth-action";
import { createTokenHeader } from "../../jwt/auth-action";
import { useParams } from "react-router-dom";
import AuthContext from "../../jwt/auth-context";

const CommunityPostModify = () => {
	const { communityId } = useParams();
	const authCtx = useContext(AuthContext);
	let isLogin = authCtx.isLoggedIn;
	let isGetUser = authCtx.isGetUserSuccess;

	const [boardTitle, setBoardTitle] = useState("");
	const title = boardTitle;
	const onChangeTitle = (e) => {
		setBoardTitle(e.target.value);
	};
	const [boardType, setBoardType] = useState("");
	const type = boardType;
	const onChangeType = (e) => {
		setBoardType(e.target.value);
	};
	const [boardContent, setBoardContent] = useState("");
	const content = boardContent;
	const onChangeContent = (e) => {
		setBoardContent(e.target.value);
	};

	const [userCocktailList, setUserCocktailList] = useState([]);
	useEffect(() => {
		if (isGetUser) {
			// User 정보를 불러와야지 이 함수를 호출 가능해서 여기다 작성
			getCocktailData();
		}
	}, [isGetUser]);

	const getCocktailData = async () => {
		const userCocktailData = GET(
			`http://localhost:8080/cocktail/prefer/${authCtx.userObj.username}`,
			createTokenHeader(authCtx.token)
		);
		userCocktailData.then((result) => {
			if (result !== null) {
				setUserCocktailList(result.data);
				// console.log("유저 선호 칵테일 : " + result.data);
				// result.data.forEach(cocktail => console.log(cocktail));
			}
		});
	};

	useEffect(() => {
		getBoard();
	}, []);

	useEffect(() => {
		if (isLogin) {
			authCtx.getUser();
		}
	}, [isLogin]);

	const getBoard = async (page) => {
		try {
			const boardsData = await GET(
				`http://localhost:8080/board/${communityId}`,
				createTokenHeader(authCtx.token)
			);

			if (boardsData !== null) {
				console.log(
					"board 내용: " + JSON.stringify(boardsData.data, null, 2)
				);
				setBoardTitle(boardsData.data.title);
				setBoardType(boardsData.data.type);
				setBoardContent(boardsData.data.content);
			}
		} catch (error) {
			console.error("An error occurred while fetching the board:", error);
			// Handle the error state, display an error message, etc.
		}
	};

	const onClickSubmit = () => {
		if (boardTitle === "") {
			alert("제목을 입력해주세요!");
			return;
		}
		if (boardContent === "") {
			alert("내용을 입력해주세요!");
			return;
		}

		const boardsData = PUT(
			`http://localhost:8080/board/${communityId}`,
			{
				title: boardTitle,
				content: boardContent,
				boardType: boardType,
			},
			createTokenHeader(authCtx.token)
		);
		boardsData.then((result) => {
			alert("수정이 완료되었습니다!");
			document.location.href = `/community/${communityId}`;
		});
	};

	function userCocktailCard(props) {
		if (userCocktailList.length === 0) {
			return;
		}
		let result = [];

		if (userCocktailList.length >= 2) {
			if (userCocktailList[0].id === userCocktailList[1].id) {
				result.push(
					<div
						style={{
							width: "15vw",
							height: "calc(250px)",
							display: "flex",
							justifyContent: "center",
							alignContent: "center",
							marginTop: "calc(37.5vh - 175px)",
						}}
					>
						<span
							style={{
								fontSize: "15px",
								marginTop: "calc(37.5vh - 175px)",
							}}
						>
							선호하는 태그를 설정하면 맞춤 추천이 가능합니다!
						</span>
					</div>
				);
				return result;
			}
		}
		result.push(
			<CocktailCard
				horizontalMargin={"10px"}
				verticalMargin={"10vh"}
				info={userCocktailList[0]}
			/>
		);
		return result;
	}

	return (
		<div className="CommunityPostModify">
			<Sidebar />
			<div className="edit_wrap">
				<select
					className="edit_type"
					name="type"
					value={type}
					onChange={onChangeType}
				>
					<option name="type" value={"TIP"}>
						Tip
					</option>
					<option name="type" value={"RECIPE"}>
						Recipe
					</option>
				</select>
				<input
					type="text"
					name="title"
					value={title}
					className="edit_title"
					onChange={onChangeTitle}
				></input>
				<hr />
				<textarea
					className="edit_content"
					value={content}
					onChange={onChangeContent}
				></textarea>
				<input
					type="submit"
					value="완료"
					className="edit_submit"
					onClick={onClickSubmit}
				/>
			</div>
			{userCocktailCard()}
		</div>
	);
};

export default CommunityPostModify;
