import React, { useContext, useEffect, useState } from "react";
import cocktailImage from "../images/cocktailsample.png";
import blackHeartImage from "../images/blackHeart.png";
import soundImage from "../images/sound.png";
import Tag from "./common/tag.js";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import AuthContext from "../jwt/auth-context";
import { PUT } from "../jwt/fetch-auth-action";
import { createTokenHeader } from "../jwt/auth-action";
import { VscHeartFilled } from "react-icons/vsc";

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
	margin: 0px 8px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media (max-width: 600px) {
		height: 55%;
	}
	@media (min-width: 600px) and (max-width: 900px) {
		height: 50%;
	}
	@media (min-width: 900px) and (max-width: 1200px) {
		height: 45%;
	}
	@media (min-width: 1200px) and (max-width: 1600px) {
		height: 40%;
	}
	@media (min-width: 1600px) {
		height: 35%;
	}
`;

const TitleContainer = styled.div`
	margin: 10px 0px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const NameText = styled.p`
	width: 75%;
	color: black;
	font-family: var(--font-Reem-Kufi-Fun);
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
	height: calc(100% - 50px);

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
	margin: 8px 16px;
	height: 16px;
`;

const BlackHeartImage = styled.img`
	width: 16px;
	height: 16px;
	margin: 8px 8px;
	-webkit-user-drag: none;
	-webkit-user-select: none;
`;

const HeartText = styled.div`
	font-family: var(--font-Jua);
	margin: 0px 4px;
	-webkit-user-select: none;
`;

const styles = {
	link: {
		margin: "0px 8px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		height: "calc(100% - 40px)",
	},
};

function CocktailCard(props) {
	const authCtx = useContext(AuthContext);
	const [isLike, setIsLike] = useState(props.info.userLikeCocktail);
	const [like, setLike] = useState(props.info.liked);

	useEffect(() => {
		console.log("CocktailCard useEffect 호출!");
		//setIsLike(props.info.userLikeCocktail);
		//setLike(props.info.liked);
	}, []);

	const likeClicked = async (event) => {
		if (authCtx.isLoggedIn) {
			const result = PUT(
				`http://3.35.180.1:8080/cocktail/${props.info.id}/like`,
				null,
				createTokenHeader(authCtx.token)
			);
			// 만약 이미 좋아요를 누른 칵테일이라면
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
		<Card
			horizontalMargin={props.horizontalMargin}
			verticalMargin={props.verticalMargin}
		>
			<Link to={`/cocktail/${props.info.id}`} style={styles.link}>
				<Image
					src={require(`../images/${props.info.id}.jpeg`)}
					alt={cocktailImage}
				/>
				<Container>
					<TitleContainer>
						<NameText>{props.info.name}</NameText>
						{/*<SoundImage src={soundImage} alt={soundImage} />*/}
					</TitleContainer>
					<TagContainer>
						{props.info.cocktailTagList &&
							props.info.cocktailTagList.map((info, index) => (
								<Tag info={info} key={index} />
							))}
					</TagContainer>
				</Container>
			</Link>
			<HeartContainer onClick={() => likeClicked()}>
				{isLike ? (
					<VscHeartFilled style={{ color: "red" }} />
				) : (
					<VscHeartFilled style={{ color: "black" }} />
				)}
				<HeartText>{like}</HeartText>
			</HeartContainer>
		</Card>
	);
}

CocktailCard.defaultProps = {
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

export default CocktailCard;
