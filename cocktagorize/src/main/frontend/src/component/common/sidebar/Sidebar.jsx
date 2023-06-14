import React, { useContext } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../jwt/auth-context";

export default function Sidebar() {
	const authCtx = useContext(AuthContext);
	const logoutHandler = () => {
		authCtx.logout();
		document.location.href = "/";
	};

	function communityClicked() {
		if (!authCtx.isLoggedIn) {
			alert("로그인을 해주세요!");
			document.location.href = "/";
		}
	}

	return (
		<div className="sidebar">
			<div className="menu">
				<span>MENU</span>
			</div>
			<hr></hr>
			<ul className="menulist">
				<li>
					<Link style={{ width: "100%" }} to="/">
						<VscHome /> <span className="list home">HOME</span>
					</Link>
				</li>

				<li onClick={communityClicked}>
					<Link style={{ width: "100%" }} to="/community">
						<VscCommentDiscussion />
						<span className="list community"> Community</span>
					</Link>
				</li>

				{authCtx.isLoggedIn && (
					<li>
						<Link style={{ width: "100%" }} to="/favorites">
							<VscHeartFilled />{" "}
							<span className="list favorites">Favorites</span>
						</Link>
					</li>
				)}
			</ul>
			<ul className="menulist_personal">
				{authCtx.isLoggedIn && (
					<li>
						<Link style={{ width: "100%" }} to="/myPage">
							<VscWand />{" "}
							<span className="list myPage">My Page</span>
						</Link>
					</li>
				)}

				<li>
					<VscArrowCircleRight />{" "}
					{authCtx.isLoggedIn ? (
						<span
							style={{ width: "100%" }}
							className="list Logout"
							onClick={logoutHandler}
						>
							Logout
						</span>
					) : (
						<Link style={{ width: "100%" }} to="/login">
							<span className="list Logout">Login</span>
						</Link>
					)}
				</li>
				{!authCtx.isLoggedIn && (
					<li>
						<Link style={{ width: "100%" }} to="/signUp">
							<VscArrowCircleRight />

							<span className="list Logout">Sign Up</span>
						</Link>
					</li>
				)}
			</ul>
			<hr></hr>
			{authCtx.isLoggedIn ? (
				<div className="dropdown">
					<VscAccount />{" "}
					<div className="user">
						{" "}
						<span>{authCtx.userObj.nickname}</span>{" "}
					</div>
				</div>
			) : null}
		</div>
	);
}
