import React, {useContext, useEffect, useState} from "react";
import '../MyPage/MyPage.css'
import {DELETE, POST, PUT} from "../../jwt/fetch-auth-action";
import {createTokenHeader} from "../../jwt/auth-action";
import AuthContext from "../../jwt/auth-context";

const MyPage = () => {
  const authCtx = useContext(AuthContext);
  let isLogin = authCtx.isLoggedIn;
  let isGetUser = authCtx.isGetUserSuccess;

  const user = null;
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState('');
  const [alcohol, setAlcohol] = useState(1);
  const [city, setCity] = useState("서울특별시");
  const [gu, setGu] = useState("종로구");
  const [dong, setDong] = useState("청운효자동");

  const [currentTagData, setCurrentTagData] = useState([]);

  useEffect(() => {
    if (isLogin) {
      authCtx.getUser();
    }
  }, [isLogin]);

  useEffect(() => {
    if (isGetUser) {
      getUserInfo();
    }
  }, [isGetUser]);
  const getUserInfo = () => {
    const data = POST(
        `http://localhost:8080/user`,
        {
          username: authCtx.userObj.username
        },
        createTokenHeader(authCtx.token)
    );
    data.then((result) => {
      console.log(result.data);
    });
  }

  const handleInfoEdit = () => {
    const preferTagList = currentTagData.map((tag) => tag.name);

    // axios put
    // 회원가입 칸과 똑같은 항목들이 다 있는 상태에서, id는 변경이 input readOnly 로 필드 변경 불가능하게 만들면 될거 같애요.
    const data = PUT(
        `http://localhost:8080/user`,
        {
          username: id,
          password: password,
          email: email,
          nickname: nickname,
          alcoholCapacity: alcohol,
          city: city,
          gu: gu,
          dong: dong,
          preferTagList: preferTagList,
        },
        createTokenHeader(authCtx.token)
    );
    data.then((result) => {
      authCtx.deleteUser();
      alert("회원 정보가 수정되었습니다! 다시 로그인해 주세요!");
      document.location.href = "/login";
    });
  }

  const handleInfoDelete = () => {
    // axios delte
    const boardsData = DELETE(
        `http://localhost:8080/user/${authCtx.userObj.username}`,
        createTokenHeader(authCtx.token)
    );
    boardsData.then((result) => {
      authCtx.deleteUser();
      alert("회원 탈퇴가 완료되었습니다!");
      document.location.href = "/";
    });
  }

  return (
    <div className="MyPage">
      <h2>마이페이지</h2>
      <div className="MyPage_wrap">
        <div className="MyPage_id"><span>아이디</span> <input value="기존 아이디"/></div>
        <div className="MyPage_pw"><span>비밀번호</span> <input value="기존 비밀번호"/></div>
        <div className="MyPage_em"><span>Email</span> <input value="기존 이메일"/></div>
        <div className="MyPage_nk"><span>닉네임</span> <input value="기존 닉네임"/></div>
        <div className="MyPage_ac">
          <span>주량</span>
          <select>
            <option disabled>소주_잔</option>
            <option value={1}>소주1잔</option>
            <option value={2}>소주2잔</option>
            <option value={3}>소주3잔</option>
            <option value={4}>소주4잔</option>
          </select>
        </div>
      </div>
      <div className="MyPage_info">
        <p>//선호태그 모달</p>
        <div className="location">
          <select
            name="city">
            <option disabled>시</option>
            <option value={"서울특별시"}>서울특별시</option>
          </select>
          <select name="location_gu">
            <option disabled>구</option>
            <option value={"종로구"}>종로구</option>
          </select>
          <select
            name="dong">
            <option disabled>동</option>
            <option value={"청운효자동"}>청운효자동</option>
          </select>
        </div>
      </div>
      <div className="MyPage_submit">
        <button className="MyPage_edit" onClick={handleInfoEdit}>회원정보 수정</button>
        <button className="MyPage_delete" onClick={handleInfoDelete}>탈퇴</button>
      </div>
    </div>
  );
};

export default MyPage;
