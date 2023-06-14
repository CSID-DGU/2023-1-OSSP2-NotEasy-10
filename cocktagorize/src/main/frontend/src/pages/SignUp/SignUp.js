import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../SignUp/SignUp.css";
import Modal from "../../component/modal.js";
import Tag from "../../component/common/tag.js";
import plusImage from "../../images/plusButton.png";
import * as home from "../Home/HomeCss.js";
import { Navigate, useNavigate } from "react-router-dom";
import { GET } from "../../jwt/fetch-auth-action";
import { createTokenHeader } from "../../jwt/auth-action";
import AuthContext from "../../jwt/auth-context";

const SignUp = () => {
	const authCtx = useContext(AuthContext);

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

	const [cityList, setCityList] = useState([]);
	const [dongList, setDongList] = useState([]);
	const [guList, setGuList] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		getCity();
		getDongByCity("서울특별시");
		getGuByDong("종로구");
	}, []);

	const getCity = async () => {
		const data = GET(
			`http://localhost:8080/city`,
			createTokenHeader(authCtx.token)
		);
		data.then((result) => {
			if (result !== null) {
				setCityList(result.data);
			}
		});
	};

	const getDongByCity = async (city) => {
		const data = GET(
			`http://localhost:8080/dong?city=${city}`,
			createTokenHeader(authCtx.token)
		);
		data.then((result) => {
			if (result !== null) {
				setDongList(result.data);
			}
		});
	};

	const getGuByDong = async (dong) => {
		const data = GET(
			`http://localhost:8080/gu?dong=${dong}`,
			createTokenHeader(authCtx.token)
		);
		data.then((result) => {
			if (result !== null) {
				setGuList(result.data);
			}
		});
	};

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

	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
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

	//각 option 태그 첫번째 값은 초기값으로 넣어줘야함 지금까지 onChange로 인식이 안돼서 null로 전달된 듯
	const [alcohol, setAlcohol] = useState(1);
	const [city, setCity] = useState("서울특별시");
	const [dong, setDong] = useState("종로구");
	const [gu, setGu] = useState("청운효자동");

	const onChangeAlcohol = (e) => {
		setAlcohol(e.target.value);
	};

	const onChangeCity = (e) => {
		setCity(e.target.value);
		getDongByCity(e.target.value);
	};

	const onChangeDong = (e) => {
		setDong(e.target.value);
		getGuByDong(e.target.value);
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
		}

		if (isDuplicateNicknameExist) {
			alert("닉네임 중복체크를 해주세요!");
			return;
		}

		if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(id)) {
			alert("아이디는 영어와 숫자 조합으로 6자리 이상 입력해주세요.");
			return;
		}

		if (nickname.length < 1 || nickname.length > 10) {
			alert("닉네임은 1자리 이상 10자리 이하로 입력해주세요.");
			return;
		}

		if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
			alert("비밀번호는 영어와 숫자 조합으로 8자리 이상 입력해주세요.");
			return;
		}

		if (!/\S+@\S+\.\S+/.test(email)) {
			alert("유효한 이메일 주소를 입력해주세요.");
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
					dong: dong,
					gu: gu,
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
						if (
							!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(id)
						) {
							alert(
								"아이디는 영어와 숫자 조합으로 6자리 이상 입력해주세요."
							);
						} else {
							alert("사용 가능한 아이디 입니다!");
						}
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
						if (nickname.length < 1 || nickname.length > 10) {
							alert(
								"닉네임은 1자리 이상 10자리 이하로 입력해주세요."
							);
						} else {
							alert("사용 가능한 닉네임 입니다!");
						}
					}
				});
		} catch (error) {
			alert("닉네임 중복 체크에 실패했습니다.");
		}
	};

	console.log(city);
	console.log(dong);
	console.log(gu);

	return (
		<form className="SignUp" action="">
			{isModal === true ? (
				<Modal modalOff={modalOff} parentTag={currentTagData} />
			) : null}
			<h1>Welcome to COCKTAGORIZE!</h1>
			<p>아이디 </p>
			<input
				type="text"
				name="id"
				value={id}
				placeholder="영어+숫자 6자리 이상"
				onChange={onChangeId}
			/>
			<button type="button" onClick={onClickCheckId}>
				중복확인
			</button>
			<p>비밀번호 </p>
			<input
				type="password"
				name="password"
				value={password}
				onChange={onChangePassword}
				placeholder="영어+숫자 8자리 이상"
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
				placeholder="10자리 이하의 닉네임"
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
			<select
				name="alcoholCapacity"
				value={alcohol}
				onChange={onChangeAlcohol}
			>
				<option disabled>소주_잔</option>
				<option value={1}>소주1잔</option>
				<option value={2}>소주2잔</option>
				<option value={3}>소주3잔</option>
				<option value={4}>소주4잔</option>
			</select>
			<p className="tag">선호하는 태그를 자유롭게 선택해주세요</p>

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
				<select name="city" value={city} onChange={onChangeCity}>
					<option disabled>시</option>
					{cityList.map((city) => (
						<option value={city}> {city}</option>
					))}
				</select>
				<select name="location_gu" value={dong} onChange={onChangeDong}>
					<option disabled>구</option>
					{dongList.map((dong) => (
						<option value={dong}> {dong}</option>
					))}
				</select>
				<select name="dong" value={gu} onChange={onChangeGu}>
					<option disabled>동</option>
					{guList.map((gu) => (
						<option value={gu}> {gu}</option>
					))}
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
