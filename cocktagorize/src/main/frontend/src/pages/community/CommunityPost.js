import React from "react";
import Sidebar from '../../component/common/sidebar/Sidebar';
import CocktailCard from "../../component/cocktailCard";
import './CommunityPost.css'
import UserTipList from "../../component/UserTipList";

const CommunityPost = () => {

  return (
    <div className="CommunityPost">
      <Sidebar />
      <div className="wrap">
        <div className="post_wrap">
          {/* <type컴포넌트/> */}<span className="post_title">title </span>
          <div className="post_info">
            <p className="post_name">nickname</p> <p className="post_like">like</p> <p className="post_time">created</p>
          </div>
          <hr />
          <div className="post_content">
            content
          </div>
          <div className="onlyUser">
            <button className="post_edit">edit</button>
            <button className="post_delete">delete</button>
          </div>
        </div>
        <UserTipList/>
      </div>
      <CocktailCard />
    </div>
  );
};

export default CommunityPost;
