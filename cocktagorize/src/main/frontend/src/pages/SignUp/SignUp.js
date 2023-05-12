import React from "react";
import { useState } from "react";
import '../SignUp/SignUp.css'

const SignUp = () => {
  const [id, setId] = useState();
  const [isId, setIsId] = useState(false);

  const onChangeId = (e) => {
    setId(e.target.value);
    if (e.target.value.length < 1) {
      setIsId(false);
    } else {
      setIsId(true);
    }
  }

  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState();
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);

    if (password === e.target.value) {
      setPasswordConfirmMessage('비밀번호가 일치합니다.');
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
      setIsPasswordConfirm(false);
    }
  }

  const onClickSubmit = () => {
    alert('회원가입 완료')
  }

  return (
    <form className="SignUp" action="">
      <label for="id">아이디 </label>
      <input type="text" name="id" value={id} onChange={onChangeId}/>
      <label for="password">비밀번호 </label>
      <input type="password" name="password" value={password} onChange={onChangePassword} />
      <label for="passwordconfirm">비밀번호 확인 </label>
      <input type="password" name="passwordconfirm" value={passwordConfirm} onChange={onChangePasswordConfirm} />
      {passwordConfirm && (<span>{passwordConfirmMessage}</span>)}
      <label for="nickname">닉네임 </label>
      <input type="text" name="nickname" />
      <label for="email">이메일 </label>
      <input type="email" placeholder="youremail@gmail.com" name="email" />
      <label for="alchol">주량 </label>
      <select id="alchol">
        <option selected disabled>소주_잔</option>
        <option value={"alchol1"}>소주1잔</option>
        <option value={"alchol2"}>소주2잔</option>
        <option value={"alchol3"}>소주3잔</option>
        <option value={"alchol4"}>소주4잔</option>
      </select>
      <label for="prefer_tag">선호하는 태그 </label>
      <select id="prefer_tag">
        <option selected disabled>선호태그</option>
        <option value={"sweet"}>달콤</option>
        <option value={"sour"}>상큼</option>
        <option value={"bitter"}>씁쓸</option>
      </select>
      <input className="submit" type="submit" value="가입하기" onClick={onClickSubmit} disabled={!isPasswordConfirm || !isId}/>
    </form>
  );
};

export default SignUp;
