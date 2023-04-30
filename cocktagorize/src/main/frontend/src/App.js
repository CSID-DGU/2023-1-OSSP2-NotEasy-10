import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import MyPage from "./pages/MyPage/MyPage";
import CocktailDetail from "./pages/CocktailDetail/CocktailDetail";
import CommunityPostList from "./pages/community/CommunityPostList";
import CommunityPost from "./pages/community/CommunityPost";
import CommunityPostModify from "./pages/community/CommunityPostModify";
import CommunityPostWrite from "./pages/community/CommunityPostWrite";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route path="/myPage" element={<MyPage />}></Route>
      <Route
        path="/cocktail/:cocktailName"
        element={<CocktailDetail />}
      ></Route>
      <Route path="/community" element={<CommunityPostList />}></Route>
      <Route path="/community/:communityId" element={<CommunityPost />}></Route>
      <Route
        path="/community/:communityId/modify"
        element={<CommunityPostModify />}
      ></Route>
      <Route path="/community/write" element={<CommunityPostWrite />}></Route>
    </Routes>
  );
}

export default App;
