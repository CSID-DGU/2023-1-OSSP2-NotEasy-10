import React from "react";
import Sidebar from '../../component/common/sidebar/Sidebar';
import CocktailCard from "../../component/cocktailCard";
import './CommunityPost.css'
import UserTipList from "../../component/UserTipList";
import PostTag from "../../component/common/PostTag";
import {Link} from "react-router-dom";
import { VscHeartFilled} from "react-icons/vsc";

const CommunityPost = () => {

  const handleDelete = () => {
    // axios로 삭제요청 보내면 서버에서 boardList 업데이트
  };

  return (
    <div className="CommunityPost">
      <Sidebar />
      <div className="wrap">
        <div className="post_wrap">
          <div className="post_top">
            <PostTag type="board.type"/> <span className="post_title">board.title</span>
          </div>
          <div className="post_info">
            <p className="post_name">board.user.name</p> <p className="post_like"><VscHeartFilled/>board.liked</p> <p className="post_time">board.created</p>
          </div>
          <hr />
          <div className="post_content">
            board.content
          </div>
          <div className="onlyUser">
            {/* <Link to={`/community/${board.id}/modify`}>*/}<button className="post_edit">수정</button>{/* </Link>*/}
            <button className="post_delete" onClick={handleDelete}>삭제</button>
          </div>
        </div>
        {/* <UserTipList tips={boardReplyList}/> */}
      </div>
      <CocktailCard />
    </div>
  );
};

export default CommunityPost;
