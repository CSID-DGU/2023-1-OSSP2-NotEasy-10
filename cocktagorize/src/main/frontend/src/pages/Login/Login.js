import React, {useEffect} from "react";
import '../Login/Login.css'
import {Link, useLocation} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {

  const location = useLocation();

  useEffect(() => {
    const searchError = new URLSearchParams(location.search);
    const error = searchError.get("error");
    alert(error)
  }, [])

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
    try {
      const response = await axios.post("http://localhost:8080/login", {
        id: id,
        password: password,
      }).then(res => {
        console.log(res);
      }).catch(res => {
        console.log(res);
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="Login" method="post" action="http://localhost:8080/login">
      <label for="id">ID </label>
      <input type="text" name="id" value={id} onChange={onChangeId}/>
      <label for="password">password </label>
      <input type="password" name="password" value={password} onChange={onChangePassword}/>
      <p className="toSignUp"><Link to='/SignUp'>Sign Up</Link></p>
      <input className="submit" type="submit" value="Login" onClick={onClickSubmit} disabled={!isId || !isPassword}/>
    </form>
  );
};

export default Login;
