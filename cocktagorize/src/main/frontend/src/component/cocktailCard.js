import React from "react";
import cocktailImage from "../images/cocktailsample.png";
import blackHeartImage from "../images/blackHeart.png";
import soundImage from "../images/sound.png";
import Tag from "./common/tag.js";
import styled, { css } from "styled-components";

const Card = styled.div`
	width: 300px;
	height: 480px;
	background-color: #ffffff;
	margin: 0px;
	margin-left: ${(props) => props.horizontalMargin || "0px"};
	margin-right: ${(props) => props.horizontalMargin || "0px"};
	margin-top: ${(props) => props.verticalMargin || "0px"};
	margin-bottom: ${(props) => props.verticalMargin || "0px"};
`;

const Image = styled.img`
	width: 300px;
	height: 300px;
	-webkit-user-drag: none;
	-webkit-user-select: none;
`;

const Container = styled.div`
	margin: 8px 16px;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const TitleContainer = styled.div`
	margin: 0px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const NameText = styled.h5`
	width: 200px;
	color: black;
	font-size: 24px;
	font-weight: bold;
	margin: 0px 10px 10px 10px;
	-webkit-user-select: none;
`;

const SoundImage = styled.img`
	width: 20px;
	height: 20px;
	margin: auto;
	-webkit-user-drag: none;
	-webkit-user-select: none;
`;

const TagContainer = styled.div`
	margin: 0px 8px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	overflow-x: hidden;
	overflow-y: auto;
	height: 76px;
`;

const HeartContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 8px 0px;
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
