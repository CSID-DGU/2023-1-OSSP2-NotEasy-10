import React, {useContext, useEffect, useState} from "react";
import './CommunityPostModify.css'
import Sidebar from "../../component/common/sidebar/Sidebar";
import CocktailCard from "../../component/cocktailCard";
import {DELETE, GET, PUT} from "../../jwt/fetch-auth-action";
import {createTokenHeader} from "../../jwt/auth-action";
import {useParams} from "react-router-dom";
import AuthContext from "../../jwt/auth-context";

const CommunityPostModify = () => {
  const [title, setTitle] = useState("기존 제목");
  const onChangeTitle = (e) => {setTitle(e.target.value);};
  const [type, setType] = useState("RECIPE");
  const onChangeType = (e) => {setType(e.target.value);};
  const [content, setContent] = useState('기존 내용');
  const onChangeContent = (e) => {setContent(e.target.value);};

  const { communityId } = useParams();
  const authCtx = useContext(AuthContext);
  let isLogin = authCtx.isLoggedIn;
  let isGetUser = authCtx.isGetUserSuccess;

  const [board, setBoard] = useState();

  useEffect(() => {
  }, [])

  useEffect(() => {
    if (isLogin) {
      authCtx.getUser();
    }
  }, [isLogin]);

  const onClickSubmit = () => {
    const boardsData = PUT(
        `http://localhost:8080/board/${communityId}`,
        {
            title : title,
            content: content,
            boardType: type
        },
        createTokenHeader(authCtx.token)
    );
    boardsData.then((result) => {
      alert("수정이 완료되었습니다!");
      document.location.href = `/community/${communityId}`;
    });
  };

  return (
    <div className="CommunityPostModify">
      <Sidebar />
      <div className="edit_wrap">
        <select className="edit_type" name="type" value={type} onChange={onChangeType}>
          <option name="type" value={"tip"}>Tip</option>
          <option name="type" value={"recipe"}>Recipe</option>
        </select>
        <input type="text" name="title" value={title} className="edit_title" onChange={onChangeTitle}></input>
        <hr />
        <textarea className="edit_content" value={content} onChange={onChangeContent}>
          {{content}}
        </textarea>
        <input type="submit" value="Done" className="edit_submit" onClick={onClickSubmit}/>
      </div>
      <CocktailCard />
    </div>
  );
};

export default CommunityPostModify;
