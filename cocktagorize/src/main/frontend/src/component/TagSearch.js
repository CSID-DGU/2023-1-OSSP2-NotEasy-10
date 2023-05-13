import React from "react";
import Tag from "./common/tag.js";
import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

const Search = styled.div`
	width: 750px;
	width: ${(props) => props.info.width};
	height: 50px;
	background-color: white;
	border: solid;
	border-color: black;
	border-width: 2px;
	border-radius: 15px;
	padding: 5px;
	margin: 0px 10px;
	margin: ${(props) => props.info.margin};
	overflow-x: auto;
	overflow-y: hidden;
	display: flex;
	flex-direction: row;
	align-items: center;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const TagSearch = (props) => {
	const [data, setData] = useState([
		{
			id: 1,
			name: "태그1",
			type: "알코올",
			mode: "delete",
		},
		{
			id: 2,
			name: "태그2",
			type: "알코올",
			mode: "delete",
		},
		{
			id: 3,
			name: "태그3",
			type: "알코올",
			mode: "delete",
		},
	]);

	const deleteTag = (targetId, mode) => {
		if (mode === "delete" && targetId !== 0) {
			const newData = data.filter((x) => x.id !== targetId);
			setData(newData);
		}
	};

	return (
		<Search info={props}>
			{data.map((info, index) => (
				<Tag
					info={{ ...info, mode: "delete" }}
					key={index}
					onDelete={deleteTag}
				/>
			))}
		</Search>
	);
};
export default TagSearch;
