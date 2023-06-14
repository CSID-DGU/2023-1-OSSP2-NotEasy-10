import React, {useCallback, useContext, useState} from "react";
import styled from "styled-components";
import './UserTipList.css';
import axios from "axios";
import {POST} from "../jwt/fetch-auth-action";
import {createTokenHeader} from "../jwt/auth-action";
import AuthContext from "../jwt/auth-context";
import {useParams} from "react-router-dom";
import UserComment from "./UserComment";

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

const UserCommentList = ({ tips }) => {
    const { communityId } = useParams();
    const [newTip, setNewTip] = useState("");

    const authCtx = useContext(AuthContext);
    let isLogin = authCtx.isLoggedIn;
    let isGetUser = authCtx.isGetUserSuccess;
    const handleTipAdd = (e) => {
        setNewTip(e.target.value);
    };

    const handleSubmitTip = () => {
        //axios로 'content: newTip'을 post하는 코드
        //그럼 서버에서 replyList에 추가된 댓글 객체를 업데이트해야함
        console.log(`추가된 댓글: ${newTip}`);
        setNewTip("");
        const result = POST(`https://3.35.180.1:8080/board/${communityId}/reply`,
            {
                content: newTip
            },
            createTokenHeader(authCtx.token)
        );
        result.then((result) => {
            if (result !== null) {
                alert("댓글이 작성되었습니다!");
                window.location.replace(`/community/${communityId}`);
            }
        });
    }

    return (
        <UserTipListBlock>
            <H4>댓글</H4>
            <TipList>
                {tips.map((tip) => (
                    <UserComment key={tip.id} tip={tip} />
                ))}
                {authCtx.isLoggedIn && (
                    <div className="tips_write_wrap">
                        <p className="tips_write_nickname">{authCtx.userObj.nickname}</p>
                        <div className="tips_wrap">
                            <textarea className="tips_write" value={newTip} onChange={handleTipAdd} placeholder="해당 게시글에 대한 의견을 공유해보세요!">
                            </textarea>
                            <button className="tips_write_submit" onClick={handleSubmitTip}>등록</button>
                        </div>
                    </div>
                )}
            </TipList>
        </UserTipListBlock>
    );
};

export default UserCommentList;