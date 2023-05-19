import React, { useContext, useEffect } from "react";
import "../sidebar/Sidebar.css";
import {
  VscHome,
  VscCommentDiscussion,
  VscNotebook,
  VscHeartFilled,
  VscWand,
  VscArrowCircleRight,
  VscAccount,
} from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../jwt/auth-context";


export default function Sidebar() {

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    navigate(1);
  }

  useEffect(() => {

    if (authCtx.isLoggedIn) {
      console.log('start');
      authCtx.getUser();
    };
  }, [authCtx.isLoggedIn]);

  return (
    <div className="sidebar">
      <div className="menu">MENU</div>
      <hr></hr>
      <ul className="menulist">
        <li>
          <VscHome /> <span className="list home"><Link to="/">HOME</Link></span>
        </li>
        <li>
          <VscCommentDiscussion />
          <span className="list community"><Link to="/community">Community</Link></span>
        </li>
        <li>
          <VscNotebook /> <span className="list post">My Post</span>
        </li>
        <li>
          <VscHeartFilled /> <span className="list favorites">Favorites</span>
        </li>
      </ul>
      <ul className="menulist_personal">
        <li>
          <VscWand /> <span className="list myPage"><Link to="/myPage">My Page</Link></span>
        </li>
        <li>
          <VscArrowCircleRight /> {authCtx.isLoggedIn ? <span className="list Logout" onClick={logoutHandler}>Logout</span> :
            <Link to="/login"><span className="list Logout">Login</span></Link>}


        </li>
      </ul>
      <hr></hr>
      <div className="dropdown">
        <VscAccount /> {authCtx.isLoggedIn ? <div className="user">{authCtx.userObj.username}</div> : <div className="user">로그인하세요</div>}
      </div>
    </div>
  );
}
