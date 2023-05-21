import React, { useState } from "react";
import styled from "styled-components";
import {
  VscHeartFilled,
  VscHeart
} from "react-icons/vsc";
import '../component/UserTip.css'
import axios from "axios";

const UserTip = (tip) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(tip.tip.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    // axios로 삭제요청 보내면 서버에서 replyList 업데이트해야함
    console.log("삭제된 댓글 아이디:", tip.tip.id);
  };

  const handleSave = () => {
    // axios로 수정된 사항('content: editedComment')을 보내면 서버에서 replyList에서 해당 변경내용을 업데이트해야함
    console.log("수정된 내용:", editedComment);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedComment(tip.tip.content);
  };

  const handleEditedCommentChange = (event) => {
    setEditedComment(event.target.value);
  };

  return (
    <div className="UserTip">
      <div>
        <div className="tip">
          <p className="tip_name">{tip.tip.user.name}</p>
          {isEditing ? (
            <textarea
              className="tip_content"
              value={editedComment}
              onChange={handleEditedCommentChange}
            ></textarea>
          ) : (
            <p className="tip_content">{tip.tip.content}</p>
          )}
          <p className="tip_createdDate">{tip.tip.createdDate}</p>
          <hr />
        </div>
        <div className="tool">
          {isEditing ? (
            <>
              <button className="tool_save" onClick={handleSave}>
                저장
              </button>
              <button className="tool_cancel" onClick={handleCancelEdit}>
                취소
              </button>
            </>
          ) : (
            <>
              <button className="tool_edit" onClick={handleEdit}>
                수정
              </button>
              <button className="tool_delete" onClick={handleDelete}>
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTip;
