import React from "react";
import UserTip from "./UserTip";
import styled from "styled-components";
import './UserTipList.css';

const UserTipListBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 1rem 0;
  height: auto;
  overflow-y: visible;
`;

const H4 = styled.h4`
  margin: 2rem 0 1rem 0.5rem;
  font-size: large;
`;

const TipList = styled.div`
  border-radius: 0.5rem;
  padding: 1.5rem 2rem;
  background-color: white;
  -webkit-box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
`;

const WriteTip = styled.input`
  width: 100%;
`;

const UserTipList = ({ tips }) => {
  return (
    <UserTipListBlock>
      <H4>유저들의 꿀팁!</H4>
      <TipList>
        {tips.map((tip) => (
          <UserTip key={tip.id} tip={tip} />
        ))}
        <div className="tips_write_wrap">
          <p className="tips_write_nickname">jwt로 받아올 user.nickname</p>
          <div className="tips_wrap">
            <textarea className="tips_write" placeholder="해당 칵테일에 대한 자신만의 팁을 공유해보세요!">
            </textarea>
            <button className="tips_write_submit">등록</button>
          </div>
        </div>
      </TipList>

    </UserTipListBlock>
  );
};

export default UserTipList;