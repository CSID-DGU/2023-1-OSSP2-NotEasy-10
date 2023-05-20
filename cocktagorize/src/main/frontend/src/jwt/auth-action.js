import { GET, POST } from "./fetch-auth-action";
import AuthContext from "./auth-context";

// 토큰을 만드는 함수
export const createTokenHeader = (token) => {
    return {
        headers: {
            'Authorization': token
        }
    };
};

// 토큰의 만료시간을 계산하는 함수
const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
};

// 토큰 값과 만료시간을 받으면 localStorage 내부에 저장해주는 함수
export const loginTokenHandler = (token, expirationTime) => {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', String(expirationTime));
    const remainingTime = calculateRemainingTime(expirationTime);
    return remainingTime;
};

// localStorage 내부에 토큰이 존재하는지 검색하는 함수
export const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime') || '0';
    const remaingTime = calculateRemainingTime(+storedExpirationDate);
    if (remaingTime <= 1000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }
    return {
        token: storedToken,
        duration: remaingTime
    };
};

export const loginActionHandler = (username, password) => {
    const URL = 'http://localhost:8080/user/login';
    const loginObject = { username, password };
    const response = POST(URL, loginObject, {});
    return response;
};

export const logoutActionHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
};

export const getUserActionHandler = (token) => {
    const URL = 'http://localhost:8080/user/info';
    const response = GET(URL, createTokenHeader(token));
    return response;
};