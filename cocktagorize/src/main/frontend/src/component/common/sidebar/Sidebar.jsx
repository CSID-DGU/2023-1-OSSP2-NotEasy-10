import React from "react";
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
import { Link } from "react-router-dom";

export default function Sidebar() {
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
          <VscArrowCircleRight /> <span className="list Logout">Logout</span>
        </li>
      </ul>
      <hr></hr>
      <div className="dropdown">
        <VscAccount /> <div className="user">User name</div>
      </div>
    </div>
  );
}
