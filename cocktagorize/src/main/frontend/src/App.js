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
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import Layout from "./Layout";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
  },
};

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/myPage" element={<MyPage />}></Route>
        <Route
          path="/cocktail/:cocktail_id"
          element={<CocktailDetail />}
        ></Route>
        <Route path="/community" element={<CommunityPostList />}></Route>
        <Route
          path="/community/:communityId"
          element={<CommunityPost />}
        ></Route>
        <Route
          path="/community/:communityId/modify"
          element={<CommunityPostModify />}
        ></Route>
        <Route path="/community/write" element={<CommunityPostWrite />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
