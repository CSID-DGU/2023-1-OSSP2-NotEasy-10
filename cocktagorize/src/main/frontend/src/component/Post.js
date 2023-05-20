import React from "react";
import cocktailImage from "../images/cocktailsample.png";
import blackHeartImage from "../images/blackHeart.png";
import soundImage from "../images/sound.png";
import PostTag from "./common/PostTag.js";
import Timestamp from "./common/Timestamp.js";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
	width: 40vw;
	height: calc(11.75vh);
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
	margin: 8px 10px;
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
	text-size-adjust: auto;
	font-weight: bold;
	white-space: nowrap;
	overflow-x: hidden;
	margin: 0px 0px 0px 10px;
	-webkit-user-select: none;
	height: inherit;
`;

const InfoContainer = styled.div`
	width: 100%;
	height: 50%;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0px 5px;
`;

const InfoText = styled.p`
	height: 80%;
	margin: 0px 8px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: normal;
	word-break: keep-all;
	-webkit-line-clamp: 2;
	-webkit-user-select: none;
`;

const BlackHeartImage = styled.img`
	width: 16px;
	height: 16px;
	margin-left: 12px;
	-webkit-user-drag: none;
	-webkit-user-select: none;
`;

const HeartText = styled.p`
	margin: 0px 8px;
	-webkit-user-select: none;
`;

function Post(props) {
	return (
		<Link to={`/cocktail/${props.info.id}`}>
			<Card
				horizontalMargin={props.horizontalMargin}
				verticalMargin={props.verticalMargin}
			>
				<TitleContainer>
					<TitleText>{props.info.title}</TitleText>
					<PostTag type="RECIPE" />
					<Timestamp created="2021-01-01 00:00:00" />
					<BlackHeartImage
						src={blackHeartImage}
						alt={blackHeartImage}
					/>
					<HeartText>{props.info.liked}</HeartText>
				</TitleContainer>
				<InfoContainer>
					<InfoText>{props.info.content}</InfoText>
				</InfoContainer>
			</Card>
		</Link>
	);
}

Post.defaultProps = {
	info: {
		id: 0,
		type: "none",
		title: "불러오기 실패",
		content:
			"불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패불러오기 실패",
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
};

export default Post;
