import React, { useContext, useEffect, useState } from "react";
import "./CommunityPostWrite.css";
import Sidebar from "../../component/common/sidebar/Sidebar";
import CocktailCard from "../../component/cocktailCard";
import { DELETE, POST, PUT, GET } from "../../jwt/fetch-auth-action";
import { createTokenHeader } from "../../jwt/auth-action";
import { useParams } from "react-router-dom";
import AuthContext from "../../jwt/auth-context";

const CommunityPostWrite = () => {
	const [title, setTitle] = useState("");
	const onChangeTitle = (e) => {
		setTitle(e.target.value);
	};
	const [type, setType] = useState("TIP");
	const onChangeType = (e) => {
		setType(e.target.value);
	};
	const [content, setContent] = useState("");
	const onChangeContent = (e) => {
		setContent(e.target.value);
	};

	const port = 8080;
	const [cocktailList, setCocktailList] = useState([]);

	const authCtx = useContext(AuthContext);
	let isLogin = authCtx.isLoggedIn;
	let isGetUser = authCtx.isGetUserSuccess;

	useEffect(() => {
		// 콘솔에 찍어뒀습니다.
	}, []);

	useEffect(() => {
		if (isLogin) {
			authCtx.getUser();
		}
	}, [isLogin]);

	useEffect(() => {
		if (isGetUser) {
			// User 정보를 불러와야지 이 함수를 호출 가능해서 여기다 작성
			getCocktailData();
		}
	}, [isGetUser]);

	const getCocktailData = async () => {
		const userCocktailData = GET(
			`http://3.35.180.1:${port}/cocktail/prefer/${authCtx.userObj.username}`,
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

	const onClickSubmit = () => {
		const boardsData = POST(
			`http://localhost:8080/board`,
			{
				title: title,
				content: content,
				boardType: type,
			},
			createTokenHeader(authCtx.token)
		);
		boardsData.then((result) => {
			alert("작성이 완료되었습니다!");
			document.location.href = `/community`;
		});
	};

	return (
		<div className="CommunityPostWrite">
			<Sidebar />
			<div className="write_wrap" action="">
				<p>커뮤니티 글쓰기</p>
				<select
					className="write_type"
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
					placeholder="제목을 입력하세요"
					className="write_title"
					onChange={onChangeTitle}
				></input>
				<hr />
				<textarea
					className="write_content"
					value={content}
					placeholder="내용을 작성해주세요"
					onChange={onChangeContent}
				></textarea>
				<div className="write_submit_wrap">
					<input
						type="submit"
						value="작성하기"
						className="write_submit"
						onClick={onClickSubmit}
					/>
				</div>
			</div>
			<CocktailCard
				horizontalMargin={"10px"}
				verticalMargin={"10vh"}
				info={cocktailList[0]}
			/>
		</div>
	);
};

export default CommunityPostWrite;
