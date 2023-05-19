import React, {useContext, useEffect} from "react";
import '../Login/Login.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import AuthContext from "../../jwt/auth-context";


const Login = () => {

    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
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

    const handleLoginClick = async (event) => {
        event.preventDefault();

        authCtx.login(username, password);

        if (authCtx.isLoggedIn) {
            navigate("/", { replace: true });
        }
    }

    return (
        // 밑에 button 태그 무조건 밖에 있어야되요
        <div className="Login">
            <p>ID </p>
            <input type="text" name="username" value={username} onChange={onChangeUsername}/>
            <p>password </p>
            <input type="password" name="password" value={password} onChange={onChangePassword}/>
            <p className="toSignUp"><Link to='/SignUp'>Sign Up</Link></p>
            <button variant="primary" className="submit" onClick={handleLoginClick} disabled={!isUsername || !isPassword}>Login</button>
        </div>
    );
};

export default Login;
