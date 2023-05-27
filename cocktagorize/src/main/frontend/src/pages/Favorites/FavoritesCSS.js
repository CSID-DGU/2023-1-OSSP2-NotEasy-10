import styled, { css } from "styled-components";

export const Entire = styled.div`
	display: flex;
	flex-direction: row;
`;

export const NonSidebar = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 25px;
	margin-left: 3vw;
	margin-right: 25px;
	width: 60vw;
	height: 85vh;
	align-items: center;
`;

export const Title = styled.p`
	width: 100%;
	height: 12%;
	text-align: center;
	-webkit-user-select: none;
	user-select: none;

	font-family: var(--font-Reem-Kufi-Fun);
	margin: 10px 10px;

	@media (max-width: 600px) {
		font-size: 24px;
	}
	@media (min-width: 600px) and (max-width: 900px) {
		font-size: 30px;
	}
	@media (min-width: 900px) and (max-width: 1200px) {
		font-size: 36px;
	}
	@media (min-width: 1200px) and (max-width: 1600px) {
		font-size: 42px;
	}
	@media (min-width: 1600px) {
		font-size: 48px;
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 25px;
	width: 100%;
	height: 80%;
`;

export const Recipes = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	height: 88%;
	align-items: center;
	margin: 0px 5px;
`;

export const RecipesTitle = styled.p`
	width: 100%;
	height: 7.5%;
	text-align: center;
	-webkit-user-select: none;
	user-select: none;
	font-family: var(--font-Reem-Kufi-Fun);
	margin: 10px 10px;

	@media (max-width: 600px) {
		font-size: 20px;
	}
	@media (min-width: 600px) and (max-width: 900px) {
		font-size: 24px;
	}
	@media (min-width: 900px) and (max-width: 1200px) {
		font-size: 28px;
	}
	@media (min-width: 1200px) and (max-width: 1600px) {
		font-size: 32px;
	}
	@media (min-width: 1600px) {
		font-size: 36px;
	}
`;

export const RecipesContent = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 5px;
	width: 100%;
	height: 92.5%;
	align-items: center;

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

export const Posts = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	height: 88%;
	align-items: center;
	margin: 0px 5px;
`;

export const PostsTitle = styled.p`
	width: 100%;
	height: 7.5%;
	text-align: center;
	-webkit-user-select: none;
	user-select: none;
	margin: 10px 10px;

	font-family: var(--font-Reem-Kufi-Fun);

	@media (max-width: 600px) {
		font-size: 20px;
	}
	@media (min-width: 600px) and (max-width: 900px) {
		font-size: 24px;
	}
	@media (min-width: 900px) and (max-width: 1200px) {
		font-size: 28px;
	}
	@media (min-width: 1200px) and (max-width: 1600px) {
		font-size: 32px;
	}
	@media (min-width: 1600px) {
		font-size: 36px;
	}
`;

export const PostsContent = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 5px;
	width: 100%;
	height: 92.5%;
	align-items: center;

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

export const Image = styled.img`
	width: 10px;
	height: 10px;
	margin-top: 2px;
	margin-right: 8px;
	-webkit-user-drag: none;
	-webkit-user-select: none;
`;

export const Text = styled.p`
	font-size: 18px;
	text-align: center;
	-webkit-user-select: none;
	user-select: none;
`;

export const Hr = styled.div`
	width: 100%;
	height: 1px;
	background-color: black;
`;

export const Vr = styled.div`
	width: 1px;
	height: 100%;
	background-color: black;
`;

export const Loading = styled.div`
	width: 25vw;
	height: 50vh;
	margin: 10px;
	-webkit-user-drag: none;
	-webkit-user-select: none;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const LoadingImage = styled.img`
	width: 75px;
	height: 75px;
	-webkit-user-drag: none;
	-webkit-user-select: none;
	animation: rotate_image 1s ease-out infinite;
	transform-origin: 50% 50%;

	@keyframes rotate_image {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
