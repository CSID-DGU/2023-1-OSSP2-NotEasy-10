import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../component/common/sidebar/Sidebar";
import "../CocktailDetail/CocktailDetail.css";
import UserTipList from "../../component/UserTipList";
import Tag from "../../component/common/tag.js";
import { VscHeartFilled, VscHeart, VscUnmute, VscLinkExternal } from "react-icons/vsc";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../jwt/auth-context";
import {GET, PUT} from "../../jwt/fetch-auth-action";
import {createTokenHeader} from "../../jwt/auth-action";

const CocktailDetail = () => {
	const { cocktail_id } = useParams();
	const [ cocktail, setCocktail ] = useState(null);
	const [ replyList, setReplyList ] = useState([]);
	const [isLike, setIsLike] = useState();
	const [like, setLike] = useState(0);

	const authCtx = useContext(AuthContext);
	let isLogin = authCtx.isLoggedIn;
	let isGetUser = authCtx.isGetUserSuccess;

	useEffect(() => {
		if (isLogin) {
			authCtx.getUser();
		}
	}, [isLogin]);

	useEffect(() => {
		if (isGetUser) {

		}
	}, [isGetUser]);

	useEffect(() => {
		const getCocktailDetails = async () => {
			const result = GET(`http://localhost:8080/cocktail/${cocktail_id}`, createTokenHeader(authCtx.token));
			result.then((result) => {
				if (result !== null) {
					setCocktail(result.data);
					console.log(result);
					setReplyList(result.data.cocktailReplyList);
					setLike(result.data.liked);
					setIsLike(result.data.userLikeCocktail);
				}
			});
		};
		getCocktailDetails();
	}, []);


	if (!cocktail) {
		return null;
	}
	const likeClicked = (id) => {
		// 로그인을 했다면
		if (authCtx.isLoggedIn) {
			const result = PUT(`http://localhost:8080/cocktail/${id}/like`, null, createTokenHeader(authCtx.token));
			result.then((result) => {
				if (result !== null) {
					setLike(result.data.liked);
					setIsLike(!isLike);
				}
			});
		} else {
			alert("로그인을 해주세요!");
		}
	}

	const tagList = cocktail.cocktailTagList.map((tag) => (
		<Tag key={tag.id} info={tag} />
	));
	const ingre = cocktail.cocktailTagList.filter(
		(tag) => tag.category === "INGREDIENT" || tag.category === "ALCOHOL"
	);
	const ingredient = ingre.map((tag) => <p key={tag.id}>{tag.name}</p>);

	return (
		<div className="CocktailDetail">
			<Sidebar />
			<div className="content">
				<div className="tags">{tagList}</div>
				<div className="inner">
					<div className="inner_left">
						<div className="cocktail_card">
							<img
								className="cocktail_image"
								src={require(`../../images/${cocktail.id}.jpeg`)}
								alt="칵테일 이미지"
							/>
							<div className="cocktail_icon">
								{isLike ? <VscHeartFilled onClick={() => likeClicked(cocktail.id)} style={{color:"red"}} /> : <VscHeartFilled onClick={() => likeClicked(cocktail.id)} />}
								<span key={cocktail.id}>{like}</span> <p><hr/></p>
								<VscUnmute />
							</div>
						</div>
						<p> 유사한 칵테일 </p>
						<div className="cocktail_similar">
							<img
								className="cocktail_similar_image"
								src={require(`../../images/${cocktail.similarCocktail.id}.jpeg`)}
								alt="유사 칵테일 이미지"
							></img>
							<div
								className="cocktail_similar_name"
								key={cocktail.similarCocktail.id}
							>
								<p className="cocktail_similar_name2">{cocktail.similarCocktail.name}{" "}</p>
								<div className="similar_liked">
									<p key={cocktail.similarCocktail.id}></p>{" "}
									<VscHeart />
									<span key={cocktail.similarCocktail.id}>{cocktail.similarCocktail.liked}</span></div>
								<a href={`/cocktail/${cocktail.similarCocktail.id}`}>
									<VscLinkExternal />
								</a>
							</div>
						</div>
					</div>
					<div className="inner_right">
						<div className="cocktail_recipe">
							<div className="name" key={cocktail.id}>
								{cocktail.name}
							</div>
							<hr />
							<div className="info">
								<div className="info_left">
									<p>재료: </p>
									<span
										className="ingredient"
										key={cocktail.id}
									>
										{ingredient}
									</span>
									<p>도수: </p>
									<span className="alchol" key={cocktail.id}>
										{cocktail.alcholeDegree}도
									</span>
									<p>추천잔: </p>
									<span className="glass" key={cocktail.id}>
										{cocktail.glassType}
									</span>
								</div>
								<div className="info_right">
									<p>레시피: </p>
									<span className="order" key={cocktail.id}>
										{cocktail.recipe}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<UserTipList tips={replyList}/>
			</div>
		</div>
	);
};

export default CocktailDetail;
