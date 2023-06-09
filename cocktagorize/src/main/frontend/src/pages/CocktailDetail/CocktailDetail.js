import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../component/common/sidebar/Sidebar";
import "../CocktailDetail/CocktailDetail.css";
import UserTipList from "../../component/UserTipList";
import Tag from "../../component/common/tag.js";
import { POST } from "../../jwt/fetch-auth-action";
import {
	VscHeartFilled,
	VscHeart,
	VscUnmute,
	VscLinkExternal,
} from "react-icons/vsc";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../jwt/auth-context";
import { GET, PUT } from "../../jwt/fetch-auth-action";
import { createTokenHeader } from "../../jwt/auth-action";
import styled, { css } from "styled-components";

const Ingredient = styled.span`
	font-size: 1rem;
	text-align: center;
	font-family: var(--font-Jua);
	background-color: #9999ff;
	margin: 5px 15px;
	padding: 4px 0px;
	color: white;
	-webkit-user-select: none;
	-webkit-user-drag: none;

	${(props) => {
		switch (props.category) {
			case "INGREDIENT":
				return css`
					background-color: #6e41e2;
				`;
			case "ALCOHOL":
				return css`
					background-color: brown;
				`;
			case "JUICE":
				return css`
					background-color: #ff0066;
				`;
			case "BITTER":
				return css`
					background-color: #660033;
				`;
			case "MILK":
				return css`
					background-color: #0080ff;
				`;
			case "SYRUP":
				return css`
					background-color: #cccc00;
				`;
		}
	}};
`;

const CocktailDetail = () => {
	const { cocktail_id } = useParams();
	const [cocktail, setCocktail] = useState(null);
	const [replyList, setReplyList] = useState([]);
	const [isLike, setIsLike] = useState();
	const [like, setLike] = useState(0);
	const [isSimilarLike, setIsSimilarLike] = useState();
	const [similarLike, setSimilarLike] = useState(0);
	const [audio, setAudio] = useState(null);
	const [isAudio, setIsAudio] = useState(false);

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
		}
	}, [isGetUser]);

	useEffect(() => {
		const getCocktailDetails = async () => {
			const result = GET(
				`http://3.35.180.1:8080/cocktail/${cocktail_id}`,
				createTokenHeader(authCtx.token)
			);
			result.then((result) => {
				if (result !== null) {
					console.log(result.data);
					setCocktail(result.data);
					setReplyList(result.data.cocktailReplyList);
					setLike(result.data.liked);
					setIsLike(result.data.userLikeCocktail);
					setSimilarLike(result.data.similarCocktail.liked);
					setIsSimilarLike(
						result.data.similarCocktail.userLikeCocktail
					);
				}
			});
		};
		getCocktailDetails();
	}, []);

	if (!cocktail) {
		return null;
	}
	const likeClicked = (id) => {
		// 로그인을 했다면
		if (authCtx.isLoggedIn) {
			const result = PUT(
				`http://3.35.180.1:8080/cocktail/${id}/like`,
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
	const fetchTTSAPI = () => {
		const recipe = cocktail.recipe;
		// 현재 아이디의 칵테일 레시피 가져오기

		// 요청에 필요한 데이터 전달 = 칵테일 레시피
		const requestData = {
			content: recipe,
		};

		// API 엔드포인트 URL
		const apiUrl = `http://3.35.180.1:8080/cocktail/${cocktail.id}/tts`;

		// API 요청

		const result = fetch(apiUrl, {
			method: "POST",
			body: JSON.stringify(requestData),
			headers: {
				"Content-Type": "application/json",
			},
		});
		/*
        const result = POST(
           `http://3.35.180.1:8080/cocktail/${cocktail.id}/tts`,
           {
              method: "POST",
              body: JSON.stringify(requestData),
              headers: {
                 "Content-Type": "application/json",
              },
           },
           createTokenHeader(authCtx.token)
        );
        */
		result
			.then((response) => {
				if (response.ok) {
					// 오디오 스트리밍 응답 처리
					response.blob().then((blob) => {
						const audioUrl = URL.createObjectURL(blob);
						const playAudio = new Audio(audioUrl);
						setAudio(() => playAudio);
						setIsAudio(() => true);
						playAudio.play();
						playAudio.onended = () => {
							setIsAudio(() => false);
						};
					});
				} else {
					console.error("TTS API 호출에 실패했습니다."); //호출 실패
				}
			})
			.catch((error) => {
				console.error("TTS API 호출 중 오류가 발생했습니다.", error);
			});
	};

	const tagList = cocktail.cocktailTagList.map((tag) => (
		<Tag key={tag.tagDto.name} info={tag.tagDto} />
	));
	const ingre = cocktail.cocktailTagList.filter(
		(tag) =>
			tag.tagDto.category === "INGREDIENT" ||
			tag.tagDto.category === "ALCOHOL" ||
			tag.tagDto.category === "JUICE" ||
			tag.tagDto.category === "BITTER" ||
			tag.tagDto.category === "MILK" ||
			tag.tagDto.category === "SYRUP"
	);
	const ingredient = ingre.map((tag) => (
		<p key={tag.tagDto.id}>
			{tag.tagDto.name} {}
		</p>
	));

	const similarLikeClicked = async (event) => {
		if (authCtx.isLoggedIn) {
			const result = PUT(
				`http://3.35.180.1:8080/cocktail/${cocktail.similarCocktail.id}/like`,
				null,
				createTokenHeader(authCtx.token)
			);
			// 만약 이미 좋아요를 누른 칵테일이라면
			result.then((result) => {
				if (result !== null) {
					setSimilarLike(result.data.liked);
					setIsSimilarLike(!isSimilarLike);
					console.log(result);
				}
			});
		} else {
			alert("로그인을 해주세요!");
		}
	};

	return (
		<div className="CocktailDetail">
			<Sidebar />
			<div className="content">
				<div className="tags">{tagList}</div>
				<div className="inner">
					<div className="inner_left">
						<div className="cocktail_card">
							<img
								className="cocktail_image"
								src={require(`../../images/${cocktail.id}.jpeg`)}
								alt="칵테일 이미지"
							/>
							<div className="cocktail_icon">
								{isLike ? (
									<VscHeartFilled
										onClick={() => likeClicked(cocktail.id)}
										style={{ color: "red" }}
									/>
								) : (
									<VscHeartFilled
										onClick={() => likeClicked(cocktail.id)}
									/>
								)}
								<span className="liked_amount">{like}</span>{" "}
								<p>
									<hr />
								</p>
								{isAudio === true ? (
									<VscUnmute
										style={{
											color: "red",
											width: "30px",
											height: "30px",
										}}
										onClick={() => {
											audio.pause();
											audio.currentTime = 0;
											setIsAudio(() => false);
										}}
									/>
								) : (
									<VscUnmute
										style={{
											width: "30px",
											height: "30px",
										}}
										onClick={() => fetchTTSAPI()}
									/>
								)}
							</div>
						</div>
						<p style={{ marginBottom: "15px" }}> 유사한 칵테일 </p>
						<div className="cocktail_similar">
							<a
								href={`/cocktail/${cocktail.similarCocktail.id}`}
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<img
									href={`/cocktail/${cocktail.similarCocktail.id}`}
									className="cocktail_similar_image"
									src={require(`../../images/${cocktail.similarCocktail.id}.jpeg`)}
									alt="유사 칵테일 이미지"
								></img>

								<div className="cocktail_similar_name">
									<p className="cocktail_similar_name2">
										{cocktail.similarCocktail.name}{" "}
									</p>
								</div>
							</a>

							<div className="similar_liked">
								{isSimilarLike ? (
									<VscHeartFilled
										style={{ color: "red" }}
										onClick={(e) => {
											similarLikeClicked();
										}}
									/>
								) : (
									<VscHeartFilled
										style={{ color: "black" }}
										onClick={(e) => {
											similarLikeClicked();
										}}
									/>
								)}
								<span className="liked_amount">
									{similarLike}
								</span>
							</div>
						</div>
					</div>
					<div className="inner_right">
						<div className="cocktail_recipe">
							<div className="name">{cocktail.name}</div>
							<hr />
							<div className="info">
								<div className="info_left">
									<p>재료: </p>
									{ingre.map((tag) => (
										<Ingredient
											key={tag.tagDto.name}
											category={tag.tagDto.category}
										>
											{tag.tagDto.name}
											{tag.amount !== null
												? ", " + tag.amount
												: null}
										</Ingredient>
									))}
									<p>도수: </p>
									<span className="alchol">
										{cocktail.alcholeDegree}도
									</span>
									<p>추천잔: </p>
									<span className="glass">
										{cocktail.glassType}
									</span>
								</div>
								<div className="info_right">
									<p>레시피: </p>
									<span className="order">
										{cocktail.recipe}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<UserTipList tips={replyList} />
			</div>
		</div>
	);
};

export default CocktailDetail;
