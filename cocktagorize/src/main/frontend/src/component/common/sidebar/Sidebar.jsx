import React, {useContext} from "react";
import "../sidebar/Sidebar.css";
import {
    VscHome,
    VscCommentDiscussion,
    VscNotebook,
    VscHeartFilled,
    VscWand,
    VscArrowCircleRight,
    VscAccount,
} from "react-icons/vsc";
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../../../jwt/auth-context";


export default function Sidebar() {

    const authCtx = useContext(AuthContext);
    const logoutHandler = () => {
        authCtx.logout();
        document.location.href = "/";
    }

    return (
        <div className="sidebar">
            <div className="menu">MENU</div>
            <hr></hr>
            <ul className="menulist">
                <li>
                    <VscHome/> <span className="list home"><Link to="/">HOME</Link></span>
                </li>
                <li>
                    <VscCommentDiscussion/>
                    <span className="list community"><Link to="/community">Community</Link></span>
                </li>

                {
                    authCtx.isLoggedIn && <li>
                        <VscNotebook/> <span className="list post">My Post</span>
                    </li>
                }

                {
                    authCtx.isLoggedIn && <li>
                        <VscHeartFilled/> <span className="list favorites"><Link to="/favorites">Favorites</Link></span>
                    </li>
                }


            </ul>
            <ul className="menulist_personal">

                {
                    authCtx.isLoggedIn && <li>
                        <VscWand/> <span className="list myPage"><Link to="/myPage">My Page</Link></span>
                    </li>
                }

                <li>
                    <VscArrowCircleRight/> {authCtx.isLoggedIn ?
                    <span className="list Logout" onClick={logoutHandler}>Logout</span> :
                    <Link to="/login"><span className="list Logout">Login</span></Link>}
                </li>
                {
                    !authCtx.isLoggedIn && <li>
                        <VscArrowCircleRight/>
                        <Link to="/signUp"><span className="list Logout">Sign Up</span></Link>
                    </li>
                }
            </ul>
            <hr></hr>
            <div className="dropdown">
                <VscAccount/> {authCtx.isLoggedIn ? <div className="user"> {authCtx.userObj.nickname} </div> :
                <div className="user"> Username </div>}
            </div>
        </div>
    );
}
