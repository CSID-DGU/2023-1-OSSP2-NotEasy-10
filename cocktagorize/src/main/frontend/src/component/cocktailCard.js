import React from "react";
import cocktailImage from "../images/cocktailsample.png";
import blackHeartImage from "../images/blackHeart.png";
import soundImage from "../images/sound.png";
import Tag from "./common/tag.js";
import styled, { css } from "styled-components";

const Card = styled.div`
	width: 15.625vw;
	height: calc(75vh - 270px);
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

const Image = styled.img`
	width: 100%;
	-webkit-user-drag: none;
	-webkit-user-select: none;

	@media (max-width: 600px) {
		height: 40%;
	}
	@media (min-width: 600px) and (max-width: 900px) {
		height: 45%;
	}
	@media (min-width: 900px) and (max-width: 1200px) {
		height: 50%;
	}
	@media (min-width: 1200px) and (max-width: 1600px) {
		height: 55%;
	}
	@media (min-width: 1600px) {
		height: 60%;
	}
`;

const Container = styled.div`
	margin: 0px 16px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media (max-width: 600px) {
		height: 60%;
	}
	@media (min-width: 600px) and (max-width: 900px) {
		height: 55%;
	}
	@media (min-width: 900px) and (max-width: 1200px) {
		height: 50%;
	}
	@media (min-width: 1200px) and (max-width: 1600px) {
		height: 45%;
	}
	@media (min-width: 1600px) {
		height: 40%;
	}
`;

const TitleContainer = styled.div`
	margin: 5px 0px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const NameText = styled.p`
	width: 70%;
	color: black;
	@media (max-width: 600px) {
		font-size: 12px;
	}
	@media (min-width: 600px) and (max-width: 900px) {
		font-size: 15px;
	}
	@media (min-width: 900px) and (max-width: 1200px) {
		font-size: 18px;
	}
	@media (min-width: 1200px) and (max-width: 1600px) {
		font-size: 21px;
	}
	@media (min-width: 1600px) {
		font-size: 24px;
	}
	font-weight: bold;
	white-space: nowrap;
	margin: 0px 0px 0px 10px;
	-webkit-user-select: none;
	height: inherit;
`;

const SoundImage = styled.img`
	margin: auto;
	-webkit-user-drag: none;
	-webkit-user-select: none;

	@media (max-width: 600px) {
		width: 12px;
		height: 12px;
	}
	@media (min-width: 600px) and (max-width: 900px) {
		width: 14px;
		height: 14px;
	}
	@media (min-width: 900px) and (max-width: 1200px) {
		width: 16px;
		height: 16px;
	}
	@media (min-width: 1200px) and (max-width: 1600px) {
		width: 18px;
		height: 18px;
	}
	@media (min-width: 1600px) {
		width: 20px;
		height: 20px;
	}
`;

const TagContainer = styled.div`
	margin: 0px 8px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	overflow-x: hidden;
	overflow-y: auto;
	width: 100%;
	height: calc(100% - 90px);

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
	-webkit-user-select: none;
`;

function CocktailCard(props) {
	return (
		<Card
			horizontalMargin={props.horizontalMargin}
			verticalMargin={props.verticalMargin}
		>
			<Image src={cocktailImage} alt={cocktailImage} />
			<Container>
				<TitleContainer>
					<NameText>Card title</NameText>
					<SoundImage src={soundImage} alt={soundImage} />
				</TitleContainer>
				<TagContainer>
					<Tag name="태그1" />
					<Tag name="태그2" />
					<Tag name="태그123123123123123123" />
				</TagContainer>
				<HeartContainer>
					<BlackHeartImage
						src={blackHeartImage}
						alt={blackHeartImage}
					/>
					<HeartText>123</HeartText>
				</HeartContainer>
			</Container>
		</Card>
	);
}

export default CocktailCard;
