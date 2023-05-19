import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../jwt/auth-context";
import '../MyPage/MyPage.css'
import axios from "axios";

const MyPage = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (authCtx.isLoggedIn) {
        console.log('start');
        authCtx.getUser();

        try {
          const response = await axios.post("http://localhost:8080/user", {
            username: authCtx.userObj.username,
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
    
  }, [authCtx.isLoggedIn]);

  return (
    <div>
      {authCtx.isLoggedIn ? (
        <p>Welcome, {authCtx.userObj.username}!</p>
      ) : (
        <div className="mypage_logout">
          <a href="/login">로그인</a>
        </div>
      )}
    </div>
  );
};

export default MyPage;
