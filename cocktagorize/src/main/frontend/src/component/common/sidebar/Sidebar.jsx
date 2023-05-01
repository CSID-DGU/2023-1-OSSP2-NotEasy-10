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

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="menu">MENU</div>
      <hr></hr>
      <ul className="menulist">
        <li>
          <VscHome /> <span className="list home">HOME</span>
        </li>
        <li>
          <VscCommentDiscussion />
          <span className="list community">Community</span>
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
          <VscWand /> <span className="list myPage">My Page</span>
        </li>
        <li>
          <VscArrowCircleRight /> <span className="list Logout">Logout</span>
        </li>
      </ul>
      <hr></hr>
      <div className="dropdown">
        <VscAccount /> <div className="list User">User Name</div>
      </div>
    </div>
  );
}
