import React, {useEffect} from "react";
import '../Login/Login.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
};

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [isUsername, setIsUsername] = useState(false);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        if (e.target.value.length < 1) {
            setIsUsername(false);
        } else {
            setIsUsername(true);
        }
    }

    const [password, setPassword] = useState("");
    const [isPassword, setIsPassword] = useState(false);

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 1) {
            setIsPassword(false);
        } else {
            setIsPassword(true);
        }
    }

    const onClickSubmit = async () => {
        const response = await axios.post(
            "http://localhost:8080/login",
            {
                username: username,
                password: password
            },
            config
        );
        const data = response.data;
        if (data.isSuccess === true) {
            console.log(data.accessToken);
            navigate("/");
        } else {
            alert("로그인 실패!");
        }
    }

    return (
        // 밑에 button 태그 무조건 밖에 있어야되요
        <div className="Login">
            <label htmlFor="username">ID </label>
            <input type="text" name="username" value={username} onChange={onChangeUsername}/>
            <label htmlFor="password">password </label>
            <input type="password" name="password" value={password} onChange={onChangePassword}/>
            <p className="toSignUp"><Link to='/SignUp'>Sign Up</Link></p>
            <button variant="primary" className="submit" onClick={onClickSubmit} disabled={!isUsername || !isPassword}>Login</button>
        </div>
    );
};

export default Login;
