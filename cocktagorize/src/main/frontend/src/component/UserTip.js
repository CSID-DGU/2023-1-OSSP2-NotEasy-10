import React from "react";
import styled from "styled-components";

const UserTipBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Nickname = styled.h5`
  margin: 0;
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
`;

const ReplyContent = styled.div`
  // 보이는 줄 수 제한 + 더보기 기능
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;

  font-size: 0.75rem;
  margin-bottom: 0.3rem;

  &:has(+ Input:checked) {
    -webkit-line-clamp: unset;
  }
`;

const Input = styled.input`
  margin: 0;
  appearance: none;
  font-size: 0.25rem;
  border-radius: 0.25em;
  cursor: pointer;

  &::before {
    color: gray;
    content: "자세히 보기";
  }
  &:checked::before {
    content: "간략히";
  }
`;

const UserTip = () => {
  return (
    <UserTipBlock>
      <Nickname>정재욱</Nickname>
      <ReplyContent>
        하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
        하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
        하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
        하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
        하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
      </ReplyContent>
      <Input type="checkbox" />
    </UserTipBlock>
  );
};

export default UserTip;
