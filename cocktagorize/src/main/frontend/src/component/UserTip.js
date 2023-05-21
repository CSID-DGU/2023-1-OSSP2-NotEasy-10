import React, {useContext, useState} from "react";
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

const UserTip = (tip) => {
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

  return (
    <div className="UserTip">
      <div>
        <div className="tip">
          <p className="tip_name">{tip.tip.user.name}</p>
          <p className="tip_content">{tip.tip.content}</p>
          <p className="tip_createdDate">{tip.tip.createdDate}</p>
          <hr/>
        </div>
        <div className="tool">
          <button className="tool_edit">수정</button>
          <button className="tool_delete">삭제</button>
        </div>
      </div>
  );
};

export default UserTip;