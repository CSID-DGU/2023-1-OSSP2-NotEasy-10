import axios from 'axios';

export function login(data) {
    return dispatch => {
        return axios.post("https://3.35.180.1:8080/user/login", data).then(res => {
            const token = res.data.accessToken;
            const expiresIn = res.data.tokenExpiresIn;
            localStorage.setItem("TOKEN", token);
            localStorage.setItem("ExpiresIn", expiresIn);
        }).catch(err => {
            const errorCode = err.response.status;
            console.log(errorCode);
            alert("Auth.js : 잘못된 아이디 혹은 비밀번호입니다!");
        })
    }
}