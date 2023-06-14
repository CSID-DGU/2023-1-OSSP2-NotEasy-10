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
					value="Done"
					className="edit_submit"
					onClick={onClickSubmit}
				/>
			</div>
			<CocktailCard />
		</div>
	);
};

export default CommunityPostModify;
