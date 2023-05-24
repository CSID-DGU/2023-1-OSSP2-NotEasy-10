import React from "react";
import cocktailImage from "../images/cocktailsample.png";
import blackHeartImage from "../images/blackHeart.png";
import soundImage from "../images/sound.png";
import Tag from "./common/tag.js";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import {
	VscHeartFilled,
	VscHeart,
	VscUnmute,
	VscLinkExternal,
} from "react-icons/vsc";

const Card = styled.div`
	width: ${(props) => props.width || "25vw"};
	height: ${(props) => props.height || "144px"};
	background-color: #ffffff;
	margin: 0px;
	margin-left: ${(props) => props.horizontalMargin || "0px"};
	margin-right: ${(props) => props.horizontalMargin || "0px"};
	margin-top: ${(props) => props.verticalMargin || "0px"};
	margin-bottom: ${(props) => props.verticalMargin || "0px"};
	-webkit-user-drag: none;
	-webkit-user-select: none;
	display: flex;
	flex-direction: row;
`;

const Image = styled.img`
	width: 30%;
	height: calc(100% - 16px);
	margin: 8px 8px;
`;

const Container = styled.div`
	margin: 8px 8px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 70%;
	height: 100%;
`;

const TopContainer = styled.div`
	margin: 0px 0px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 30%;
`;

const TitleContainer = styled.div`
	width: 75%;
	margin: 5px 0px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const NameText = styled.p`
	width: 100%;
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
	white-space: nowrap;
	overflow-x: hidden;
	margin: 0px 0px 0px 0px;
	-webkit-user-select: none;
	height: inherit;
`;

const TagContainer = styled.div`
	margin: 0px 8px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	overflow-x: hidden;
	overflow-y: auto;
	width: 100%;
	height: calc(70%);

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-track {
		background-color: #ccccff;
		margin: 0px 5px;
		border-radius: 5px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 5px;
		background-color: #6666ff;
	}

	&::-webkit-scrollbar-button {
		width: 0;
		height: 0;
	}
`;

const HeartContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 8px 0px;
	height: 16px;
`;

const BlackHeartImage = styled.img`
	width: 16px;
	height: 16px;
	margin: 0px 8px;
	-webkit-user-drag: none;
	-webkit-user-select: none;
`;

const HeartText = styled.div`
	margin: 0px 4px;
	font-family: var(--font-Jua);
	-webkit-user-select: none;
`;

function Recipe(props) {
	return (
		<Link to={`/cocktail/${props.info.id}`}>
			<Card
				horizontalMargin={props.horizontalMargin}
				verticalMargin={props.verticalMargin}
				width={props.width}
				height={props.height}
			>
				<Image
					src={require(`../images/${props.info.id}.jpeg`)}
					alt={cocktailImage}
				/>
				<Container>
					<TopContainer>
						<TitleContainer>
							<NameText>{props.info.name}</NameText>
						</TitleContainer>
						<HeartContainer>
							{props.info.userLikeCocktail ? (
								<VscHeartFilled style={{ color: "red" }} />
							) : (
								<VscHeartFilled />
							)}
							<HeartText>{props.info.liked}</HeartText>
						</HeartContainer>
					</TopContainer>
					<TagContainer>
						{props.info.cocktailTagList &&
							props.info.cocktailTagList.map((info, index) => (
								<Tag info={info} key={index} />
							))}
					</TagContainer>
				</Container>
			</Card>
		</Link>
	);
}

Recipe.defaultProps = {
	info: {
		id: 0,
		name: "불러오기 실패",
		liked: 0,
		glassType: "none",
		alcoholDegree: 0,
		cocktailTagList: [
			{
				id: 0,
				name: "불러오기 실패",
				type: "오류",
				mode: "none",
				isOverlap: "false",
			},
		],
	},
};

export default Recipe;
