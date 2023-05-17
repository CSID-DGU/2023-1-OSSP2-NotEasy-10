import React, { useState, useEffect, useCallback } from "react";
import * as authAction from './auth-action';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    userObj: { username: '' },
    isLoggedIn: false,
    isSuccess: false,
    isGetSuccess: false,
    login: (username, password) => { },
    logout: () => { },
    getUser: () => { },
});

export const AuthContextProvider = (props) => {

    const tokenData = authAction.retrieveStoredToken();

    let initialToken;

    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);
    const [userObj, setUserObj] = useState({
        username: ''
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [isGetSuccess, setIsGetSuccess] = useState(false);

    const userIsLoggedIn = !!token;

    const loginHandler = (username, password) => {
        setIsSuccess(false);
        console.log(isSuccess);
        const data = authAction.loginActionHandler(username, password);
        data.then((result) => {
            if (result !== null) {
                const loginData = result.data;
                setToken(loginData.accessToken);
                logoutTimer = setTimeout(
                    logoutHandler,
                    authAction.loginTokenHandler(loginData.accessToken, loginData.tokenExpiresIn)
                );
                setIsSuccess(true);
            }
        });
    };

    const logoutHandler = useCallback(() => {
        setToken('');
        authAction.logoutActionHandler();
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
        alert("로그아웃 되었습니다!");
    }, []);

    const getUserHandler = () => {
        setIsGetSuccess(false);
        const data = authAction.getUserActionHandler(token);
        data.then((result) => {
            if (result !== null) {
                console.log('get user start!');
                const userData = result.data;
                setUserObj(userData);
                setIsGetSuccess(true);
            }
        });
    };

    useEffect(() => {
        if (tokenData) {
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }

        return () => clearTimeout(logoutTimer);
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token,
        userObj,
        isLoggedIn: userIsLoggedIn,
        isSuccess,
        isGetSuccess,
        login: loginHandler,
        logout: logoutHandler,
        getUser: getUserHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};
export default AuthContext;
