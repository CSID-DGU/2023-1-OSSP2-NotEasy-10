import React, { useState } from "react";
import styled from "styled-components";
import {
  VscHeartFilled,
  VscHeart
} from "react-icons/vsc";
import '../component/UserTip.css'

// const UserTipBlock = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   margin-bottom: 1rem;
// `;

// const Nickname = styled.h5`
//   margin: 0;
//   margin-bottom: 0.25rem;
//   font-size: 0.8rem;
// `;

// const ReplyContent = styled.div`
//   // 보이는 줄 수 제한 + 더보기 기능
//   display: -webkit-box;
//   -webkit-line-clamp: 4;
//   -webkit-box-orient: vertical;
//   overflow: hidden;

//   font-size: 0.75rem;
//   margin-bottom: 0.3rem;

//   &:has(+ Input:checked) {
//     -webkit-line-clamp: unset;
//   }
// `;

// const Input = styled.input`
//   margin: 0;
//   appearance: none;
//   font-size: 0.25rem;
//   border-radius: 0.25em;
//   cursor: pointer;

//   &::before {
//     color: gray;
//     content: "자세히 보기";
//   }
//   &:checked::before {
//     content: "간략히";
//   }
// `;

// const InfoBlock = styled.div`
//   display: flex;
// `;

// const Time = styled.div`

// `;

const UserTip = () => {
  // return (
  //   <UserTipBlock>
  //     <InfoBlock>
  //       <Nickname>정재욱</Nickname> <LikeButton/> <Time>2023년 12월 10일 15:30</Time>
  //     </InfoBlock>
  //     <ReplyContent>
  //       하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
  //       하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
  //       하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
  //       하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
  //       하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
  //     </ReplyContent>
  //     <Input type="checkbox" />
  //   </UserTipBlock>
  // );
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likedComments, setLikedComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      id: new Date().getTime(),
      name,
      comment,
      timestamp: new Date().toLocaleString(),
      liked: false,
    };
    setComments([...comments, newComment]);
    setName('');
    setComment('');
  };

  const handleLike = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedComment = { ...comment, liked: !comment.liked };
        if (updatedComment.liked) {
          setLikedComments([...likedComments, commentId]);
        } else {
          const filteredLikedComments = likedComments.filter(
            (id) => id !== commentId
          );
          setLikedComments(filteredLikedComments);
        }
        return updatedComment;
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleEdit = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditedComment(commentText);
  };

  const handleSave = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, comment: editedComment };
      }
      return comment;
    });
    setComments(updatedComments);
    setEditingCommentId(null);
  };

  const handleDelete = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
    setEditingCommentId(null);
  };

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="tip">
            <p>이름: {comment.name}</p>
            {editingCommentId === comment.id ? (
              <div className="writeEdit">
                <textarea
                  type="text"
                  value={editedComment}
                  onChange={(event) =>
                    setEditedComment(event.target.value)
                  }
                />
                <button onClick={() => handleSave(comment.id)}>저장</button>
              </div>
            ) : (
              <p>댓글 내용: {comment.comment}</p>
            )}
            <div className="likeAndTime">
              <p>좋아요 수: <button onClick={() => handleLike(comment.id)}>
                {comment.liked ? <VscHeartFilled /> : <VscHeart />}</button>
                {likedComments.filter(id => id === comment.id).length}</p>
              <p>댓글 작성 시간: {comment.timestamp}</p>
            </div>
          </div>
          <div className="edit">
            <button onClick={() => handleEdit(comment.id, comment.comment)}>
              {editingCommentId === comment.id ? '취소' : '수정'}
            </button>
            <button onClick={() => handleDelete(comment.id)}>삭제</button>
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="write">
        <textarea
          type="text"
          placeholder="댓글 작성"
          value={comment}
          onChange={handleCommentChange}
        />
        <button type="submit">댓글 작성</button>
      </form>
    </div>
  );
};

export default UserTip;
