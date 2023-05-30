import styled, { css } from "styled-components";

export const Entire = styled.div`
	display: flex;
	flex-direction: row;
`;

export const NonSidebar = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 25px;
	margin-left: 5vw;
	margin-right: 25px;
	width: 45vw;
	height: 80vh;
	align-items: center;
`;

export const PostList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5px;
	margin-left: 25px;
	margin-right: 25px;
	width: 100%;
	height: 70%;
`;

export const NonExplore = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-x: hidden;
	overflow-y: auto;
	width: calc(100% - 0px);
	height: calc(100% - 70px);

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-track {
		background-color: #ccccff;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 0px;
		background-color: #6666ff;
	}

	&::-webkit-scrollbar-button {
		width: 0;
		height: 0;
	}
`;

export const Image = styled.img`
	width: 10px;
	height: 10px;
	margin-top: 2px;
	margin-right: 8px;
	-webkit-user-drag: none;
	-webkit-user-select: none;
`;

export const Explore = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: auto;
	height: 100px;
	margin: 20px 50px 10px 0px;
`;

export const Search = styled.input`
	width: 24vw;
	height: 50px;
	border-radius: 15px;
	padding: 0px 10px;
	border-color: black;
	font-size: 24px;
	font-family: var(--font-Jua);
	margin: 10px;
`;

export const Sort = styled.select`
	width: 12vw;
	height: 50px;
	border-width: 2px;
	border-radius: 15px;
	padding: 0px 10px;
	border-color: black;
	font-size: 18px;
	font-family: var(--font-Jua);
	margin: 10px;
`;

export const SortBase = styled.option`
	font-size: 18px;
	font-family: var(--font-Jua);
`;

export const SearchOption = styled.select`
	width: 100px;
	height: 30px;
	border-width: 2px;
	border-radius: 15px;
	margin: 0px 5px;
	padding: 0px 10px;
	border-color: black;
	font-size: 18px;
	font-family: var(--font-Jua);
`;

export const SearchOptionBase = styled.option`
	font-size: 18px;
	font-family: var(--font-Jua);
`;

export const Text = styled.p`
	font-size: 18px;
	font-family: var(--font-Jua);
	text-align: center;
	-webkit-user-select: none;
	user-select: none;
`;

export const PageScroll = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: auto;
	margin-top: 20px;
	padding: 0px;
`;

export const PageScrollIndex = styled.div`
	width: 40px;
	height: 50px;
	margin: 2px;
	padding: 0px;
	border: solid;
	border-color: black;
	border-radius: 10px;
	background-color: white;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: #ccccff;
		${(props) => {
			if (props.page === props.btnIndex)
				return css`
					background-color: #6666ff;
				`;
		}};
	}

	${(props) => {
		if (props.page === props.btnIndex)
			return css`
				background-color: #6666ff;
			`;
	}};

	transition: background-color 0.2s;
`;

export const Loading = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	background-color: rgba(0, 0, 0, 0.5);
`;
export const blackXButton = styled.img`
	width: 15px;
	height: 15px;
	margin-left: -40px;
	margin-right: 20px;
	float: left;
	-webkit-user-drag: none;
	-webkit-user-select: none;
`;

export const Cocktailbar = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 25px;
	margin-left: 2.5vw;
	margin-right: 25px;
	width: 25vw;
	height: 80vh;
	justify-content: center;
	align-items: center;
`;
