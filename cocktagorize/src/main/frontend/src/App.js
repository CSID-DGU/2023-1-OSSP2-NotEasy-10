import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import MyPage from "./pages/MyPage/MyPage";
import CocktailDetail from "./pages/CocktailDetail/CocktailDetail";
import CommunityPostList from "./pages/community/CommunityPostList";
import CommunityPost from "./pages/community/CommunityPost";
import CommunityPostModify from "./pages/community/CommunityPostModify";
import CommunityPostWrite from "./pages/community/CommunityPostWrite";
import Favorites from "./pages/Favorites/Favorites";
import Layout from "./Layout";
import { useContext } from "react";
import AuthContext from "./jwt/auth-context";
import Weather from "./Weather";

function App() {
	const authCtx = useContext(AuthContext);

	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<Home />}></Route>
				<Route
					path="/login"
					element={
						authCtx.isLoggedIn ? <Navigate to="/" /> : <Login />
					}
				></Route>
				<Route
					path="/signUp"
					element={
						authCtx.isLoggedIn ? <Navigate to="/" /> : <SignUp />
					}
				></Route>
				<Route path="/myPage" element={<MyPage />}></Route>
				<Route
					path="/cocktail/:cocktail_id"
					element={<CocktailDetail />}
				></Route>
				<Route
					path="/community"
					element={<CommunityPostList />}
				></Route>
				<Route
					path="/community/:communityId"
					element={<CommunityPost />}
				></Route>
				<Route
					path="/community/:communityId/modify"
					element={<CommunityPostModify />}
				></Route>
				<Route
					path="/community/write"
					element={<CommunityPostWrite />}
				></Route>
				<Route path="/favorites" element={<Favorites />}></Route>
			</Route>
		</Routes>
	);
}

export default App;
