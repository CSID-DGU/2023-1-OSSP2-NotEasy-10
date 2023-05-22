import React, { useContext, useEffect } from "react";
import '../MyPage/MyPage.css'

const MyPage = () => {

  const handleInfoEdit = () => {
    // axios put 
  }

  const handleInfoDelete = () => {
    // axios delte
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
