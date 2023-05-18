import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import '../SignUp/SignUp.css'
import {Navigate, useNavigate} from "react-router-dom";

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');

    const [id, setId] = useState();
    const [isId, setIsId] = useState(false);

    // id 중복 확인 했는지 검사하는 변수
    const [isDuplicateIdExist, setIsDuplicateIdExist] = useState(true);

    // 닉네임 중복 확인 했는지 검사하는 변수
    const [isDuplicateNicknameExist, setIsDuplicateNicknameExist] = useState(true);

    const navigate = useNavigate();

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

    const [alcohol, setAlcohol] = useState("");
    const [preferTag, setPreferTag] = useState(["Vodka", "Gin"]);
    const [city, setCity] = useState("");
    const [dong, setDong] = useState("");
    const [gu, setGu] = useState("");

    const onChangeAlcohol = (e) => {
        setAlcohol(e.target.value);
    }

    const onChangePreferTag = (e) => {
        setPreferTag(e.target.value);
    }

    const onChangeCity = (e) => {
        setCity(e.target.value);
    }

    const onChangeDong = (e) => {
        setDong(e.target.value);
    }

    const onChangeGu = (e) => {
        setGu(e.target.value);
    }

    const onClickSubmit = async (e) => {
        e.preventDefault();

        if (isDuplicateIdExist) {
            alert("아이디 중복체크를 해주세요!")
            return;
        }
        else if (isDuplicateIdExist) {
            alert("아이디 중복체크를 해주세요!")
            return;
        }

        if (isDuplicateNicknameExist) {
            alert("닉네임 중복체크를 해주세요!")
            return;
        }
        else if (isDuplicateNicknameExist) {
            alert("닉네임 중복체크를 해주세요!")
            return;
        }

        const preferTagList = currentTagData.map((tag) => tag.name);

        try {
            const response = await axios.post("http://localhost:8080/user/join", {
                "username": id,
                "password": password,
                "email": email,
                "nickname": nickname,
                "alcoholCapacity": alcohol,
                "city": "서울특별시",
                "dong": "",
                "gu": "",
                "preferTagList": preferTagList,
            }).then((response) => {
                alert("회원가입에 성공하였습니다!");
                navigate("/");
            })
        } catch (error) {
            alert("회원가입에 실패했습니다.");
        }
    };

    const onClickCheckId = async (e) => {
        try {
            let data = {
                "username": id
            }
            const response = await axios.post("http://localhost:8080/user/join/id", data, {
                    header: {
                        "Content-Type": `application/json`
                    }
                }
            ).then((res) => {
                console.log(res.data);
                setIsDuplicateIdExist(res.data);
                if (res.data) {
                    alert("존재하는 아이디 입니다!");
                } else {
                    alert("사용 가능한 아이디 입니다!")
                }
            })
        } catch (error) {
            alert("아이디 중복 체크에 실패했습니다.");
        }
    }

    const onClickCheckNickname = async (e) => {
        try {
            let data = {
                "nickname": nickname
            }
            const response = await axios.post("http://localhost:8080/user/join/nickname", data, {
                    header: {
                        "Content-Type": `application/json`,
                    }
                }
            ).then((res) => {
                setIsDuplicateNicknameExist(res.data);
                if (res.data) {
                    alert("존재하는 닉네임 입니다!");
                } else {
                    alert("사용 가능한 닉네임 입니다!")
                }
            })
        } catch (error) {
            alert("닉네임 중복 체크에 실패했습니다.");
        }
    }

    return (
        <form className="SignUp" action="">
            <p>아이디 </p>
            <input type="text" name="id" value={id} onChange={onChangeId}/>
            <button type="button" onClick={onClickCheckId}>중복확인</button>
            <p for="password">비밀번호 </p>
            <input type="password" name="password" value={password} onChange={onChangePassword}/>
            <p>비밀번호 확인 </p>
            <input type="password" name="passwordconfirm" value={passwordConfirm} onChange={onChangePasswordConfirm}/>
            {passwordConfirm && (<span>{passwordConfirmMessage}</span>)}
            <p>닉네임 </p>
            <input type="text" name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
            <button type="button" onClick={onClickCheckNickname}>중복확인</button>
            <p>이메일 </p>
            <input type="email" placeholder="youremail@gmail.com" name="email" value={email}
                   onChange={(e) => setEmail(e.target.value)}/>
            <p>주량 </p>
            <select name="alchol" value={alcohol} onChange={onChangeAlcohol}>
                <option disabled>소주_잔</option>
                <option value={"alchol1"}>소주1잔</option>
                <option value={"alchol2"}>소주2잔</option>
                <option value={"alchol3"}>소주3잔</option>
                <option value={"alchol4"}>소주4잔</option>
            </select>
            <p>선호하는 태그 </p>
            <select name="prefer_tag" value={preferTag} onChange={onChangePreferTag}>
                <option disabled>선호태그</option>
                <option value={"sweet"}>달콤</option>
                <option value={"sour"}>상큼</option>
                <option value={"bitter"}>씁쓸</option>
            </select>
            <p>지역 </p>
            <div className="location">
                <select name="location_city" value={city} onChange={onChangeCity}>
                    <option disabled>시</option>
                    <option value={"서울특별시"}>서울특별시</option>
                </select>
                <select name="location_dong" value={dong} onChange={onChangeDong}>
                    <option disabled>동</option>
                    <option value={"종로구"}>종로구</option>
                </select>
                <select name="location_gu" value={gu} onChange={onChangeGu}>
                    <option disabled>구</option>
                    <option value={"청운효자동"}>청운효자동</option>
                </select>
            </div>
            <input className="submit" type="submit" value="가입하기" onClick={onClickSubmit}
                   disabled={!isPasswordConfirm || !isId}/>
        </form>
    );
};

export default SignUp;
