import React from "react";
import styled from "styled-components";
import Sidebar from "../../component/common/sidebar/Sidebar.jsx";
import Modal from "../../component/modal.js";
import Tag from "../../component/common/tag.js";
import CocktailCard from "../../component/cocktailCard.js";

const Entire = styled.div`
	display: flex;
	flexdirection: row;
`;

const NotSidebar = styled.div`
	display: flex;
	flex-direction: column;
`;

const Explore = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: auto;
	height: 100px;
	margin: 20px 50px 10px 50px;
`;

const Search = styled.input`
	width: 300px;
	height: 50px;
	border-radius: 15px;
	padding: 0px 10px;
	border-color: black;
	font-size: 24px;
`;

const TagSearch = styled.div`
	width: 750px;
	height: 50px;
	background-color: white;
	border: solid;
	border-color: black;
	border-width: 2px;
	border-radius: 15px;
	padding: 5px;
	margin: 0px 10px;
	overflow-x: auto;
	overflow-y: hidden;
	display: flex;
	flex-direction: row;
	align-items: center;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const Sort = styled.select`
	width: 300px;
	height: 50px;
	border-radius: 15px;
	padding: 0px 10px;
	border-color: black;
	font-size: 18px;
`;

const SortBase = styled.option`
	font-size: 18px;
`;

const WeatherNUserCocktail = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: auto;
	height: auto;
	margin: 0px 50px;
	border: solid;
	border-color: black;
	border-width: 2px;
`;

const Weather = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 320px;
	height: auto;
	border: solid;
	border-radius: 10px;
	border-color: black;
	margin: 0px 10px;
`;

const WeatherInfoBox = styled.div`
	width: 300px;
	height: 50px;
	margin: 5px;
	padding: auto 10px;
	border: solid;
	border-radius: 5px;
	border-color: black;
`;

const WeatherInfo = styled.p`
	text-justify: center;
	font-size: 18px;
	margin: 10px;
`;

const WeatherCocktail = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 300px;
	height: auto;
	margin: 5px;
	border: solid;
	border-radius: 10px;
	border-color: black;
	overflow-x: auto;
	overflow-y: hidden;
`;

const UserRecommand = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 960px;
	height: auto;
	border: solid;
	border-radius: 10px;
	border-color: black;
	margin: 0px 10px;
`;

const UserRecommandInfoBox = styled.div`
	width: 960px;
	height: 50px;
	margin: 5px;
	padding: auto 10px;
	border: solid;
	border-radius: 5px;
	border-color: black;
`;

const UserRecommandInfo = styled.p`
	text-justify: center;
	font-size: 18px;
	margin: 10px;
`;

const UserRecommandCocktail = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 960px;
	height: 503px;
	margin: 5px;
	border: solid;
	border-radius: 10px;
	border-color: black;
	overflow-x: hidden;
	overflow-y: hidden;
`;

const Home = () => {
	return (
		<Entire>
			<Sidebar />
			<NotSidebar>
				<Explore>
					<Search type="text" placeholder="Search"></Search>
					<TagSearch>
						<Tag name="태그1" />
						<Tag name="태그2" />
						<Tag name="태그3" />
						<Tag name="태그000000000000000000000000000000000000000000000000000000000000" />
					</TagSearch>
					<Sort>
						<SortBase selected="selected">
							당신에게 추천하는 칵테일
						</SortBase>
						<SortBase>사람들이 좋아하는 칵테일</SortBase>
						<SortBase>최근에 댓글이 올라온 칵테일</SortBase>
					</Sort>
				</Explore>
				<WeatherNUserCocktail>
					<Weather>
						<WeatherInfoBox>
							<WeatherInfo>비가 많이 와요!</WeatherInfo>
						</WeatherInfoBox>
						<WeatherCocktail>
							<CocktailCard />
							<CocktailCard />
							<CocktailCard />
						</WeatherCocktail>
					</Weather>
					<UserRecommand>
						<UserRecommandInfoBox>
							<UserRecommandInfo>
								당신을 위한 칵테일
							</UserRecommandInfo>
						</UserRecommandInfoBox>
						<UserRecommandCocktail>
							<CocktailCard horizontalMargin="10px" />
							<CocktailCard horizontalMargin="10px" />
							<CocktailCard horizontalMargin="10px" />
						</UserRecommandCocktail>
					</UserRecommand>
				</WeatherNUserCocktail>
			</NotSidebar>
		</Entire>
	);
};

export default Home;
