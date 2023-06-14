import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../component/common/sidebar/Sidebar";
import CocktailCard from "../../component/cocktailCard";
import "./CommunityPost.css";
import UserCommentList from "../../component/UserCommentList";
import PostTag from "../../component/common/PostTag";
import { Link, useParams } from "react-router-dom";
import { VscHeartFilled } from "react-icons/vsc";
import AuthContext from "../../jwt/auth-context";
import { DELETE, GET, PUT } from "../../jwt/fetch-auth-action";
import { createTokenHeader } from "../../jwt/auth-action";

const CommunityPost = () => {
	const { communityId } = useParams();
	const authCtx = useContext(AuthContext);
	let isLogin = authCtx.isLoggedIn;
	let isGetUser = authCtx.isGetUserSuccess;
	const [isLike, setIsLike] = useState();
	const [like, setLike] = useState(0);

	const [cocktailList, setCocktailList] = useState([]);
	const port = 8080;

	const [board, setBoard] = useState();
	const [boardReplyList, setBoardReplyList] = useState([]);

	useEffect(() => {
		getBoard();
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

	const getBoard = async (page) => {
		const boardsData = GET(
			`http://localhost:8080/board/${communityId}`,
			createTokenHeader(authCtx.token)
		);
		boardsData.then((result) => {
			if (result !== null) {
				console.log(
					"board 내용 : " + JSON.stringify(result.data, null, 2)
				);
				setBoard(result.data);
				setBoardReplyList(result.data.boardReplyList);
				setLike(result.data.liked);
				setIsLike(result.data.userLikeBoard);
			}
		});
	};

	if (!board) {
		return null;
	}

	const likeClicked = (id) => {
		// 로그인을 했다면
		if (authCtx.isLoggedIn) {
			const result = PUT(
				`http://localhost:8080/board/${id}/like`,
				null,
				createTokenHeader(authCtx.token)
			);
			result.then((result) => {
				if (result !== null) {
					setLike(result.data.liked);
					setIsLike(!isLike);
				}
			});
		} else {
			alert("로그인을 해주세요!");
		}
	};

	// delete button은 로그인 username이랑 작성자 username이랑 비교해서 아예 안보이게 하면 될거 같애요.
	const handleDelete = () => {
		if (window.confirm("정말 삭제하시겠습니까??") == true) {
			const boardsData = DELETE(
				`http://localhost:8080/board/${communityId}`,
				createTokenHeader(authCtx.token)
			);
			boardsData.then((result) => {
				alert("삭제가 완료되었습니다!");
				document.location.href = "/community";
			});
		} else {
			return false;
		}
	};

	function timeConvert(time) {
		return new Date(time).toLocaleString(); // Date 형식으로 변환
	}

	return (
		<div className="CommunityPost">
			<Sidebar />
			<div className="wrap">
				<div className="post_wrap">
					<div className="post_top">
						<PostTag type={board.type} />{" "}
						<span className="post_title">{board.title}</span>
					</div>
					<div className="post_info">
						<p className="post_name">{board.user.nickname}</p>{" "}
						<p className="post_time">
							{timeConvert(board.createdDate)}
						</p>
					</div>
					<hr />
					<div className="post_content">{board.content}</div>
					{board.user.nickname === authCtx.userObj.nickname && (
						<div className="onlyUser">
							<button
								className="post_like"
								onClick={() => likeClicked(board.id)}
							>
								{isLike ? (
									<>
										<span>좋아요 취소 </span>
										<VscHeartFilled
											style={{ color: "red" }}
										/>
									</>
								) : (
									<>
										<span>좋아요 </span>
										<VscHeartFilled />
									</>
								)}
								{like}
							</button>
							<Link to={`/community/${communityId}/modify`}>
								<button className="post_edit">수정</button>
							</Link>
							<button
								className="post_delete"
								onClick={handleDelete}
							>
								삭제
							</button>
						</div>
					)}
				</div>
				<UserCommentList tips={boardReplyList} />
			</div>
			<CocktailCard
				verticalMargin="10vh"
				horizontalMargin="10px"
				info={cocktailList[0]}
			/>
		</div>
	);
};

export default CommunityPost;
