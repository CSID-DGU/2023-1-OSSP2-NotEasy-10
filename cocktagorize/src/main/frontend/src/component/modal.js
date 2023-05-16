import React from "react";
import { useState, useEffect, useRef } from "react";
import Tag from "./common/tag.js";
import styled from "styled-components";

const BlackScreen = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Window = styled.div`
	width: 62.5vw;
	height: 80vh;
	border-radius: 50px;
	background-color: white;
	border: solid;
	border-color: black;
	border-width: 5px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const WindowDiv = styled.div`
	width: inherit;
	height: inherit;
	position: relative;
	display: flex;
	flex-direction: column;
`;

const CurrentTagDiv = styled.div`
	width: auto;
	height: 60px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 30px;
`;

const SearchTagDiv = styled.div`
	width: auto;
	height: 60px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 15px;
`;

const Search = styled.input`
	width: 30%;
	height: 50px;
	margin: 0px 20px;
	padding: 0px 10px;
	border-color: black;
	border-radius: 15px;
	font-size: 24px;
`;

const SearchResultDiv = styled.div`
	width: 70%;
	height: 50px;
	margin-right: 20px;
	padding: 0px 5px;
	display: flex;
	flex-direction: row;
	align-items: center;
	border: solid;
	border-color: black;
	border-width: 2px;
	border-radius: 15px;
	overflow-x: auto;
	overflow-y: hidden;

	&::-webkit-scrollbar {
		height: 10px;
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

const CurrentTagText = styled.p`
	text-align: center;
	-webkit-user-select: none;
	user-select: none;
	font-weight: bold;
	white-space: nowrap;
	margin: 0px 0px 0px 30px;
	width: auto;

	@media (max-width: 600px) {
		font-size: 18px;
	}
	@media (min-width: 600px) and (max-width: 900px) {
		font-size: 21px;
	}
	@media (min-width: 900px) and (max-width: 1200px) {
		font-size: 24px;
	}
	@media (min-width: 1200px) and (max-width: 1600px) {
		font-size: 27px;
	}
	@media (min-width: 1600px) {
		font-size: 30px;
	}
`;

const TitleText = styled.h3`
	font-size: ${(props) => props.fontSize};
	text-align: center;
	-webkit-user-select: none;
	user-select: none;
	margin: ${(props) => props.margin};
`;

const Text = styled.p`
	font-size: ${(props) => props.fontSize}px;
	text-align: center;
	-webkit-user-select: none;
	user-select: none;
`;

const TagCategoryListDiv = styled.div`
	width: auto;
	height: 1px;
	display: flex;
	flex-direction: column;
	align-items: start;
	margin: 30px 20px;
	flex: 1 0 auto;

	overflow-x: hidden;
	overflow-y: auto;

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

const TagCategoryDiv = styled.div`
	width: calc(100% - 50px);
	height: ${(props) => props.height}px;
	display: flex;
	flex-direction: row;
	align-items: center;
	position: relative;
	border: solid;
	border-color: black;
	border-width: 2px;
	border-radius: 15px;
	margin: 20px 20px;
	padding: 30px 20px 10px 20px;
`;

const TagInsideDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	position: relative;

	overflow-x: hidden;
	overflow-y: auto;

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

const BorderOverlapDiv = styled.div`
	width: auto;
	height: 40px;
	display: flex;
	flex-direction: row;
	align-items: center;
	position: absolute;
	top: -20px;
	left: 20px;
	border: solid;
	border-color: black;
	border-width: 2px;
	border-radius: 15px;
	background-color: white;
	padding: 0px 10px;
`;

const TagSearch = styled.div`
	width: 80%;
	height: 50px;
	background-color: white;
	border: solid;
	border-color: black;
	border-width: 2px;
	border-radius: 15px;
	padding: 5px;
	margin: 0px 20px 0px 20px;
	overflow-x: auto;
	overflow-y: hidden;
	display: flex;
	flex-direction: row;
	align-items: center;

	&::-webkit-scrollbar {
		height: 10px;
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

const Modal = (props) => {
	const [tagDB, setTagDB] = useState([
		{
			id: 1,
			name: "태그1",
			category: "INGREDIENT",
			mode: "add",
		},
		{
			id: 2,
			name: "태그2",
			category: "ALCOHOL",
			mode: "add",
		},
		{
			id: 3,
			name: "태그3",
			category: "COLOR",
			mode: "add",
		},
		{
			id: 4,
			name: "태그4",
			category: "TASTE",
			mode: "add",
		},
		{
			id: 5,
			name: "태그5",
			category: "ETC",
			mode: "add",
		},
		{
			id: 6,
			name: "태그6",
			category: "WEATHER",
			mode: "add",
		},
	]);

	const [currentTagData, setCurrentTagData] = useState(props.parentTag);

	const [categoryTagData, setCategoryTagData] = useState([
		{
			categoryName: "재료",
			categoryCode: "INGREDIENT",
			height: 160,
			tags: [],
		},
		{
			categoryName: "알코올",
			categoryCode: "ALCOHOL",
			height: 100,
			tags: [],
		},
		{
			categoryName: "색깔",
			categoryCode: "COLOR",
			height: 100,
			tags: [],
		},
		{
			categoryName: "맛",
			categoryCode: "TASTE",
			height: 100,
			tags: [],
		},
		{
			categoryName: "날씨",
			categoryCode: "WEATHER",
			height: 100,
			tags: [],
		},
		{
			categoryName: "기타",
			categoryCode: "ETC",
			height: 100,
			tags: [],
		},
	]);

	useEffect(() => {
		tagDB.map((info) =>
			categoryTagData
				.find((x) => x.categoryCode === info.category)
				.tags.push(info)
		);
		setIsLoading(false);
	}, []);

	const [isLoading, setIsLoading] = useState(true);
	const [searchTagData, setSearchTagData] = useState([]);

	const addTag = (tagInfo) => {
		if (tagInfo.id !== 0) {
			const temp = currentTagData.find((x) => x.id === tagInfo.id);
			if (temp == undefined) {
				setCurrentTagData([
					...currentTagData,
					{ ...tagInfo, mode: "delete" },
				]);
			}
			console.log(currentTagData);
		}
	};

	const deleteTag = (targetId, mode) => {
		if (mode !== "none" && targetId !== 0) {
			const newData = currentTagData.filter((x) => x.id !== targetId);
			setCurrentTagData(newData);
		}
	};

	const checkOverlap = (tagInfo) => {
		const temp = currentTagData.find((x) => x.id === tagInfo.id);
		const result = temp != undefined;
		return result;
	};

	const getSearchValue = (e) => {
		setSearchTagData(tagDB.filter((x) => x.name.includes(e.target.value)));
	};

	const outSection = useRef();

	return (
		<>
			<BlackScreen
				ref={outSection}
				onClick={(e) => {
					if (outSection.current === e.target) {
						props.modalOff(currentTagData);
					}
				}}
			/>

			<Window>
				<WindowDiv>
					<CurrentTagDiv>
						<CurrentTagText>현재 태그</CurrentTagText>
						<TagSearch>
							{currentTagData.map((info, index) => (
								<Tag
									info={info}
									key={index}
									onDelete={deleteTag}
								/>
							))}
						</TagSearch>
					</CurrentTagDiv>
					<SearchTagDiv>
						<Search
							onChange={(e) => getSearchValue(e)}
							placeholder="태그 검색"
						/>
						<SearchResultDiv>
							{searchTagData.map((info, index) => (
								<Tag
									info={info}
									key={index}
									onAdd={addTag}
									onDelete={deleteTag}
									isOverlap={checkOverlap(info)}
								/>
							))}
						</SearchResultDiv>
					</SearchTagDiv>
					<TagCategoryListDiv>
						{isLoading === true ? (
							<Text>태그를 불러오고 있어요!</Text>
						) : null}

						{categoryTagData.map((info) => {
							return (
								<TagCategoryDiv height={info.height}>
									<BorderOverlapDiv>
										<TitleText>
											{info.categoryName}
										</TitleText>
									</BorderOverlapDiv>
									<TagInsideDiv>
										{info.tags.map((info, index) => (
											<Tag
												info={info}
												key={index}
												onAdd={addTag}
												onDelete={deleteTag}
												isOverlap={checkOverlap(info)}
											/>
										))}
									</TagInsideDiv>
								</TagCategoryDiv>
							);
						})}
					</TagCategoryListDiv>
				</WindowDiv>
			</Window>
		</>
	);
};

export default Modal;
