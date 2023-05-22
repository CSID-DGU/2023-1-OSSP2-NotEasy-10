import React, { useState, useEffect, useCallback } from "react";
import * as authAction from './auth-action';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    userObj: { username: '', email: '', alcoholCapacity: '', nickname: ''},
    isLoggedIn: false,
    isSuccess: false,
    isGetUserSuccess: false,
    login: (username, password) => { },
    logout: () => { },
    getUser: () => { },
    deleteUser: () => {}
});

export const AuthContextProvider = (props) => {

    const tokenData = authAction.retrieveStoredToken();

    let initialToken;

    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);
    const [userObj, setUserObj] = useState({
        username: '', email: '', alcoholCapacity: '', nickname: ''
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [isGetUserSuccess, setIsGetUserSuccess] = useState(false);

    const userIsLoggedIn = !!token;

    const loginHandler = (username, password) => {
        setIsSuccess(false);
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
        setIsGetUserSuccess(false)
        authAction.logoutActionHandler();
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
        alert("로그아웃 되었습니다!");
    }, []);

    const deleteUser = useCallback(() => {
        setToken('');
        setIsGetUserSuccess(false)
        authAction.logoutActionHandler();
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const getUserHandler = () => {
        setIsGetUserSuccess(false);
        const data = authAction.getUserActionHandler(token);
        data.then((result) => {
            if (result !== null) {
                console.log('get user start!');
                const userData = result.data;
                setUserObj(userData);
                setIsGetUserSuccess(true);
            }
        });
    };

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }

        return () => clearTimeout(logoutTimer);
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token,
        userObj,
        isLoggedIn: userIsLoggedIn,
        isSuccess,
        isGetUserSuccess,
        login: loginHandler,
        logout: logoutHandler,
        getUser: getUserHandler,
        deleteUser: deleteUser
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};
export default AuthContext;
