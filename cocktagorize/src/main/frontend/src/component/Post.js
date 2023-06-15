import React, { useContext, useEffect, useState } from "react";
import cocktailImage from "../images/cocktailsample.png";
import blackHeartImage from "../images/blackHeart.png";
import soundImage from "../images/sound.png";
import PostTag from "./common/PostTag.js";
import Timestamp from "./common/Timestamp.js";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { PUT } from "../jwt/fetch-auth-action";
import { createTokenHeader } from "../jwt/auth-action";
import AuthContext from "../jwt/auth-context";
import { VscHeartFilled } from "react-icons/vsc";

const Card = styled.div`
	width: ${(props) => props.width || "40vw"};
	height: ${(props) => props.height || "110px"};
	background-color: #ffffff;
	margin: 0px;
	margin-left: ${(props) => props.horizontalMargin || "0px"};
	margin-right: ${(props) => props.horizontalMargin || "0px"};
	margin-top: ${(props) => props.verticalMargin || "0px"};
	margin-bottom: ${(props) => props.verticalMargin || "0px"};
	-webkit-user-drag: none;
	-webkit-user-select: none;
	display: flex;
	flex-direction: column;
`;

const TitleContainer = styled.div`
	margin: 12px 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const TitleText = styled.p`
	width: 75%;
	color: black;
	@media (max-width: 600px) {
		font-size: 12px;
	}
	@media (min-width: 600px) and (max-width: 900px) {
		font-size: 14px;
	}
	@media (min-width: 900px) and (max-width: 1200px) {
		font-size: 16px;
	}
	@media (min-width: 1200px) and (max-width: 1600px) {
		font-size: 18px;
	}
	@media (min-width: 1600px) {
		font-size: 20px;
	}
	font-family: var(--font-Jua);
	text-size-adjust: auto;
	white-space: nowrap;
	overflow-x: hidden;
	margin: 0px 0px 0px 10px;
	-webkit-user-select: none;
	height: inherit;
`;

const InfoContainer = styled.div`
	width: 100%;
	height: calc(100% - 50px);
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0px 10px;
`;

const InfoText = styled.p`
	height: 2.4em;
	line-height: 1.2;
	margin: 0px 8px;
	overflow: hidden;
	text-align: left;
	text-overflow: ellipsis;
	white-space: normal;
	word-break: keep-all;
	word-wrap: break-word;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-user-select: none;
	-webkit-box-orient: vertical;
`;

const BlackHeartImage = styled.img`
	width: 16px;
	height: 16px;
	margin-left: 12px;
	-webkit-user-drag: none;
	-webkit-user-select: none;
`;

const HeartContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0px 10px;
	margin-top: auto;
	margin-bottom: 10px;
	-webkit-user-select: none;
`;

const HeartText = styled.p`
	margin: 0px 8px;
	-webkit-user-select: none;
	font-size: 14px;
	width: 20px;
	height: 20px;
`;

function Post(props) {
	const authCtx = useContext(AuthContext);
	const [isLike, setIsLike] = useState(false);
	const [like, setLike] = useState(props.info.liked);

	useEffect(() => {}, []);

	const likeClicked = async (event) => {
		// 로그인을 했다면
		if (authCtx.isLoggedIn) {
			const result = PUT(
				`http://localhost:8080/board/${props.info.id}/like`,
				null,
				createTokenHeader(authCtx.token)
			);
			result.then((result) => {
				if (result !== null) {
					setLike(result.data.liked);
					setIsLike(!isLike);
					console.log(result);
				}
			});
		} else {
			alert("로그인을 해주세요!");
		}
	};

	return (
		<Link to={`/community/${props.info.id}`}>
			<Card
				horizontalMargin={props.horizontalMargin}
				verticalMargin={props.verticalMargin}
				width={props.width}
				height={props.height}
			>
				<TitleContainer>
					<TitleText>{props.info.title}</TitleText>
					<PostTag type={props.info.type} />
					<Timestamp created={props.info.createdDate} />
				</TitleContainer>
				<InfoContainer>
					<InfoText>{props.info.content}</InfoText>
				</InfoContainer>
				{/*<HeartContainer>
					{isLike ? (
						<VscHeartFilled style={{ color: "red" }} />
					) : (
						<VscHeartFilled />
					)}
					<HeartText>{like}</HeartText>
				</HeartContainer>*/}
			</Card>
		</Link>
	);
}

Post.defaultProps = {
	info: {
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

		createdDate: "2021-06-01T00:00:00.000+00:00",
	},
};

export default Post;
