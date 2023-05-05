import React from "react";
import UserTip from "./UserTip";
import styled from "styled-components";

// 그림자 넣기
// useState로 댓글 목록 넣기
// input으로 댓글 입력하는거 넣기

const UserTipListBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem 1rem 1rem;
  height: 28vh;
  overflow-y: scroll;
`;

const H4 = styled.h4`
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const TipList = styled.div`
  border-radius: 0.25rem;
  padding: 1rem;
  background-color: white;
  -webkit-box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
`;

const UserTipList = () => {
  return (
    <UserTipListBlock>
      <H4> User's TIP</H4>
      <TipList>
        <UserTip />
        <UserTip />
      </TipList>
    </UserTipListBlock>
  );
};

export default UserTipList;