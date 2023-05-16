import React from "react";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
	const [id, setId] = useState();
	const [isId, setIsId] = useState(false);

	const onChangeId = (e) => {
		setId(e.target.value);
		if (e.target.value.length < 1) {
			setIsId(false);
		} else {
			setIsId(true);
		}
	};

	const [password, setPassword] = useState();
	const [isPassword, setIsPassword] = useState(false);

	const onChangePassword = (e) => {
		setPassword(e.target.value);
		if (e.target.value.length < 1) {
			setIsPassword(false);
		} else {
			setIsPassword(true);
		}
	};

	const onClickSubmit = () => {
		alert("로그인 완료");
	};

	return (
		<form className="Login" action="">
			<label for="id">ID </label>
			<input type="text" name="id" value={id} onChange={onChangeId} />
			<label for="password">password </label>
			<input
				type="password"
				name="password"
				value={password}
				onChange={onChangePassword}
			/>
			<p className="toSignUp">
				<Link to="/SignUp">Sign Up</Link>
			</p>
			<input
				className="submit"
				type="submit"
				value="Login"
				onClick={onClickSubmit}
				disabled={!isId || !isPassword}
			/>
		</form>
	);
};

export default Login;
