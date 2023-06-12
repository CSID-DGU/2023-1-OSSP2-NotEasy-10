import React, { useContext, useEffect, useState } from "react";
import "../MyPage/MyPage.css";
import { DELETE, POST, PUT, GET } from "../../jwt/fetch-auth-action";
import { createTokenHeader } from "../../jwt/auth-action";
import AuthContext from "../../jwt/auth-context";
import axios from "axios";
import Tag from "../../component/common/tag.js";
import Modal from "../../component/modal.js";
import plusImage from "../../images/plusButton.png";
import styled, { css } from "styled-components";

const TagSearchDiv = styled.div`
	width: 540px;
	${(props) => {
		if (props.width) {
			return css`
				width: ${props.width};
			`;
		}
	}};
	height: 50px;
	background-color: white;
	border: solid;
	border-color: black;
	border-width: 2px;
	border-radius: 15px;
	padding: 10px;
	margin: 0px 20px 50px 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const TagSearch = styled.div`
	width: 100%;
	height: 50px;
	overflow-x: auto;
	overflow-y: hidden;
	display: flex;
	flex-direction: row;
	align-items: center;

	&::-webkit-scrollbar {
		height: 10px;
	}

	&::-webkit-scrollbar-track {
		background-color: #ccccff;
		margin: 0px 5px;
		border-radius: 5px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 5px;
		background-color: #6666ff;
	}

	&::-webkit-scrollbar-button {
		width: 0;
		height: 0;
	}
`;

const ModalButton = styled.div`
	width: 30px;
	height: 30px;
	border-radius: 15px;
	padding-left: 8px;
	margin: 0px 5px;
	border-color: black;
	background-color: #6e41e2;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Image = styled.img`
	width: 10px;
	height: 10px;
	margin-top: 2px;
	margin-right: 8px;
	-webkit-user-drag: none;
	-webkit-user-select: none;
`;

const MyPage = () => {
	const authCtx = useContext(AuthContext);
	let isLogin = authCtx.isLoggedIn;
	let isGetUser = authCtx.isGetUserSuccess;

	const [isModal, setIsModal] = useState("true");
	const [currentTagData, setCurrentTagData] = useState([]);

	const [user, setUser] = useState("");

	const [userEmail, setUserEmail] = useState("");
	const email = userEmail;
	const onChangeEmail = (e) => {
		setUserEmail(e.target.value);
	};

	const [userNickname, setUserNickname] = useState("");
	const nickname = userNickname;
	const onChangeNickname = (e) => {
		setUserNickname(e.target.value);
	};
	const [isDuplicateNicknameExist, setIsDuplicateNicknameExist] =
		useState(true);
	const onClickCheckNickname = async (e) => {
		try {
			let data = {
				nickname: userNickname,
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

	const [userAlcohol, setUserAlcohol] = useState("");
	const alcohol = userAlcohol;
	const onChangeAlcohol = (e) => {
		setUserAlcohol(e.target.value);
	};

	//선호태그
	//const [preferTagList, setPreferTagList] = useState([]);
	//console.log(preferTagList);

	const [city, setCity] = useState("");
	const [dong, setDong] = useState("");
	const [gu, setGu] = useState("");

	const [cityList, setCityList] = useState([]);
	const [dongList, setDongList] = useState([]);
	const [guList, setGuList] = useState([]);

	const [isCity, setIsCity] = useState(false);
	const [isDong, setIsDong] = useState(false);

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

	const onChangeCity = (e) => {
		setCity(e.target.value);
		getDongByCity(e.target.value);
		setIsCity(true);
	};

	const onChangeDong = (e) => {
		setDong(e.target.value);
		getGuByDong(e.target.value);
		setIsDong(true);
	};

	const onChangeGu = (e) => {
		setGu(e.target.value);
	};

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
				username: authCtx.userObj.username,
			},
			createTokenHeader(authCtx.token)
		);
		data.then((result) => {
			console.log(result.data);
			setUser(result.data);
			// setUserPassword(result.data.password);
			setUserEmail(result.data.email);
			setUserNickname(result.data.nickname);
			setUserAlcohol(result.data.alcoholCapacity);
			setCity(result.data.city);
			setDong(result.data.dong);
			setGu(result.data.gu);
			setCurrentTagData(result.data.preferTagList);

			const newArray = [...result.data.preferTagList];

			const updatedArray = newArray.map((item) => {
				return {
					...item,
					mode: "delete",
				};
			});
			console.log(updatedArray);
			setCurrentTagData(updatedArray);
		});
	};

	const handleInfoEdit = () => {
		// axios put
		if (user.nickname !== userNickname) {
			if (isDuplicateNicknameExist) {
				alert("닉네임 중복체크를 해주세요!");
				return;
			}
		}

		if (nickname.length < 1 || nickname.length > 10) {
			alert("닉네임은 1자리 이상 10자리 이하로 입력해주세요.");
			return;
		}

		if (!/\S+@\S+\.\S+/.test(email)) {
			alert("유효한 이메일 주소를 입력해주세요.");
			return;
		}

		const data = PUT(
			`http://localhost:8080/user`,
			{
				username: user.username,
				password: "",
				email: userEmail,
				nickname: userNickname,
				alcoholCapacity: userAlcohol,
				city: city,
				gu: gu,
				dong: dong,
				preferTagList: currentTagData,
			},
			createTokenHeader(authCtx.token)
		);
		data.then((result) => {
			console.log(result);
			authCtx.deleteUser();
			alert("회원 정보가 수정되었습니다! 다시 로그인해 주세요!");
			document.location.href = "/login";
		});
	};

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
	};

	const modalOff = (tags) => {
		setIsModal(false);
		setCurrentTagData(tags);
		updateTag(tags);
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

	const updateTag = (newValue) => {
		setCurrentTagData((prevState) => {
			return newValue;
		});
	};

	return (
		<div className="MyPage">
			{isModal === true ? (
				<Modal modalOff={modalOff} parentTag={currentTagData} />
			) : null}
			<h2>마이페이지</h2>
			<div className="MyPage_wrap">
				<div className="MyPage_id">
					<span>아이디</span> <input value={user.username} disabled />
				</div>
				<div className="MyPage_em">
					<span>이메일</span>{" "}
					<input value={email} onChange={onChangeEmail} />
				</div>
				<div className="MyPage_nk">
					<span>닉네임</span>{" "}
					<input value={nickname} onChange={onChangeNickname} />
				</div>
				<button
					type="button"
					className="nk_button"
					onClick={onClickCheckNickname}
				>
					중복확인
				</button>
				<div className="MyPage_ac">
					<span>주량</span>
					<select value={alcohol} onChange={onChangeAlcohol}>
						<option disabled>소주_잔</option>
						<option value={1}>소주1잔</option>
						<option value={2}>소주2잔</option>
						<option value={3}>소주3잔</option>
						<option value={4}>소주4잔</option>
					</select>
				</div>
			</div>
			<div className="MyPage_info">
				<span id="preferTagText">선호 태그</span>
				<TagSearchDiv>
					<ModalButton
						onClick={() => {
							modalOn();
						}}
					>
						<Image src={plusImage} alt={plusImage} />
					</ModalButton>
					<TagSearch>
						{currentTagData.map((info, index) => (
							<Tag info={info} key={index} onDelete={deleteTag} />
						))}
					</TagSearch>
				</TagSearchDiv>
				<p className="MyPage_alert">
					*수정을 원하시면 시-{">"}구-{">"}동 순으로 선택해주세요
				</p>
				<div className="location">
					<select name="city" value={city} onChange={onChangeCity}>
						<option style={{ color: "gray" }} disabled>
							{user.city}
						</option>
						{cityList.map((city) => (
							<option value={city}> {city}</option>
						))}
					</select>
					<select
						name="location_gu"
						value={dong}
						onChange={onChangeDong}
					>
						<option style={{ color: "gray" }} disabled>
							{user.dong}
						</option>
						{dongList.map((dong) => (
							<option value={dong} disabled={!isCity}>
								{" "}
								{dong}
							</option>
						))}
					</select>
					<select name="dong" value={gu} onChange={onChangeGu}>
						<option style={{ color: "gray" }} disabled>
							{user.gu}
						</option>
						{guList.map((gu) => (
							<option value={gu} disabled={!isDong}>
								{" "}
								{gu}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="MyPage_submit">
				<button className="MyPage_edit" onClick={handleInfoEdit}>
					회원정보 수정
				</button>
			</div>
			<div className="MyPage_delete_wrap">
				<button className="MyPage_delete" onClick={handleInfoDelete}>
					회원탈퇴
				</button>
			</div>
		</div>
	);
};

export default MyPage;
