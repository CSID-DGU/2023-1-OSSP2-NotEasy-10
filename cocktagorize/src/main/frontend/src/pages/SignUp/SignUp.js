import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../SignUp/SignUp.css";
import Modal from "../../component/modal.js";
import Tag from "../../component/common/tag.js";
import plusImage from "../../images/plusButton.png";
import * as home from "../Home/HomeCss.js";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {
	const [email, setEmail] = useState("");
    const [isEmail, setIsEmail] = useState(false);
    const [nickname, setNickname] = useState("");
    const [id, setId] = useState("");

	const [currentTagData, setCurrentTagData] = useState([]);
	const [isModal, setIsModal] = useState("true");

	// id 중복 확인 했는지 검사하는 변수
	const [isDuplicateIdExist, setIsDuplicateIdExist] = useState(true);

	// 닉네임 중복 확인 했는지 검사하는 변수
	const [isDuplicateNicknameExist, setIsDuplicateNicknameExist] =
		useState(true);

	const navigate = useNavigate();

	const onChangeId = (e) => {
		setId(e.target.value);
	};

	const onChangeEmail = (e) => {
        setEmail(e.target.value);
        if (e.target.value.length < 1) {
            setIsEmail(false);
        } else {
            setIsEmail(true);
        }
    };

	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
	const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const onChangePasswordConfirm = (e) => {
		setPasswordConfirm(e.target.value);

		if (password === e.target.value) {
			setPasswordConfirmMessage("비밀번호가 일치합니다.");
			setIsPasswordConfirm(true);
		} else {
			setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
			setIsPasswordConfirm(false);
		}
	};

	const [alcohol, setAlcohol] = useState("");
	const [preferTag, setPreferTag] = useState(["Vodka", "Gin"]);
	const [city, setCity] = useState("");
	const [gu, setGu] = useState("");
	const [dong, setDong] = useState("");

	const onChangeAlcohol = (e) => {
		setAlcohol(e.target.value);
	};

	const onChangeCity = (e) => {
		setCity(e.target.value);
	};

	const onChangeDong = (e) => {
		setDong(e.target.value);
	};

	const onChangeGu = (e) => {
		setGu(e.target.value);
	};


	const modalOff = (tags) => {
		setIsModal(false);
		setCurrentTagData(tags);
	};

	const modalOn = () => {
		setIsModal(true);
	};

	const deleteTag = (targetId, mode) => {
		if (mode === "delete" && targetId !== 0) {
			const newData = currentTagData.filter((x) => x.id !== targetId);
			setCurrentTagData(newData);
		}
	};

	const onClickSubmit = async (e) => {
		e.preventDefault();

		if (isDuplicateIdExist) {
			alert("아이디 중복체크를 해주세요!");
			return;
		} else if (isDuplicateIdExist) {
			alert("아이디 중복체크를 해주세요!");
			return;
		}

		if (isDuplicateNicknameExist) {
			alert("닉네임 중복체크를 해주세요!");
			return;
		} else if (isDuplicateNicknameExist) {
			alert("닉네임 중복체크를 해주세요!");
			return;
		}

		const preferTagList = currentTagData.map((tag) => tag.name);

		try {
			const response = await axios
				.post("http://localhost:8080/user/join", {
					username: id,
					password: password,
					email: email,
					nickname: nickname,
					alcoholCapacity: alcohol,
					city: city,
					gu: gu,
					dong: dong,
					preferTagList: preferTagList,
				})
				.then((response) => {
					alert("회원가입에 성공하였습니다!");
					navigate("/");
				});
		} catch (error) {
			alert("회원가입에 실패했습니다.");
		}
	};

	const onClickCheckId = async (e) => {
		try {
			let data = {
				username: id,
			};
			const response = await axios
				.post("http://localhost:8080/user/join/id", data, {
					header: {
						"Content-Type": `application/json`,
					},
				})
				.then((res) => {
					console.log(res.data);
					setIsDuplicateIdExist(res.data);
					if (res.data) {
						alert("존재하는 아이디 입니다!");
					} else {
						alert("사용 가능한 아이디 입니다!");
					}
				});
		} catch (error) {
			alert("아이디 중복 체크에 실패했습니다.");
		}
	};

	const onClickCheckNickname = async (e) => {
		try {
			let data = {
				nickname: nickname,
			};
			const response = await axios
				.post("http://localhost:8080/user/join/nickname", data, {
					header: {
						"Content-Type": `application/json`,
					},
				})
				.then((res) => {
					setIsDuplicateNicknameExist(res.data);
					if (res.data) {
						alert("존재하는 닉네임 입니다!");
					} else {
						alert("사용 가능한 닉네임 입니다!");
					}
				});
		} catch (error) {
			alert("닉네임 중복 체크에 실패했습니다.");
		}
	};

	return (
		<form className="SignUp" action="">
			{isModal === true ? (
				<Modal modalOff={modalOff} parentTag={currentTagData} />
			) : null}
			<p>아이디 </p>
			<input type="text" name="id" value={id} onChange={onChangeId} />
			<button type="button" onClick={onClickCheckId}>
				중복확인
			</button>
			<p>비밀번호 </p>
			<input
				type="password"
				name="password"
				value={password}
				onChange={onChangePassword}
			/>
			<p>비밀번호 확인 </p>
			<input
				type="password"
				name="passwordconfirm"
				value={passwordConfirm}
				onChange={onChangePasswordConfirm}
			/>
			{passwordConfirm && <span>{passwordConfirmMessage}</span>}
			<p>닉네임 </p>
			<input
				type="text"
				name="nickname"
				value={nickname}
				onChange={(e) => setNickname(e.target.value)}
			/>
			<button type="button" onClick={onClickCheckNickname}>
				중복확인
			</button>
			<p>이메일 </p>
			<input
				type="email"
				placeholder="youremail@gmail.com"
				name="email"
				value={email}
				onChange={onChangeEmail}
			/>
			<p>주량 </p>
			<select name="alcoholCapacity" value={alcohol} onChange={onChangeAlcohol}>
				<option disabled>소주_잔</option>
				<option value={"1"}>소주1잔</option>
				<option value={"2"}>소주2잔</option>
				<option value={"3"}>소주3잔</option>
				<option value={"4"}>소주4잔</option>
			</select>
			<p>선호하는 태그 </p>

			<home.TagSearchDiv width="90%">
				<home.ModalButton
					onClick={() => {
						modalOn();
					}}
				>
					<home.Image src={plusImage} alt={plusImage} />
				</home.ModalButton>
				<home.TagSearch>
					{currentTagData.map((info, index) => (
						<Tag info={info} key={index} onDelete={deleteTag} />
					))}
				</home.TagSearch>
			</home.TagSearchDiv>
			<p>지역 </p>
			<div className="location">
				<select
					name="city"
					value={city}
					onChange={onChangeCity}
				>
					<option disabled>시</option>
					<option value={"서울특별시"}>서울특별시</option>
				</select>
				<select name="location_gu" value={gu} onChange={onChangeGu}>
					<option disabled>구</option>
					<option value={"종로구"}>종로구</option>
				</select>
				<select
					name="dong"
					value={dong}
					onChange={onChangeDong}>
					<option disabled>동</option>
					<option value={"청운효자동"}>청운효자동</option>
				</select>
			</div>
			<input
				className="submit"
				type="submit"
				value="가입하기"
				onClick={onClickSubmit}
				disabled={!isPasswordConfirm || !isEmail}
			/>
		</form>
	);
};

export default SignUp;
