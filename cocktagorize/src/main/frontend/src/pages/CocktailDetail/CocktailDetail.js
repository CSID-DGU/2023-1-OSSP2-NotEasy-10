import React from "react";
import Sidebar from "../../component/common/sidebar/Sidebar";
import "../CocktailDetail/CocktailDetail.css";
import UserTipList from "../../component/UserTipList";
import Tag from "../../component/common/tag.js";
import cocktailImage from "../../images/cocktailsample.png";
import {
  VscHeartFilled,
  VscUnmute,
  VscLinkExternal
} from "react-icons/vsc";

const CocktailDetail = () => {
  return (
    <div className="CocktailDetail">
      <Sidebar />
      <div className="content">
        <div className="tags">
          <Tag name="달달" />
          <Tag name="시원한" />
          <Tag name="상큼" />
          <Tag name="기분이 좋아지는" />
        </div>
        <div className="inner">
          <div className="inner_left">
            <div className="cocktail_card">
              <img className="cocktail_image" src={cocktailImage} alt={cocktailImage}></img>
              <div className="cocktail_icon">
                <VscHeartFilled /> <p>116</p> <VscUnmute />
              </div>
            </div>
            <p>유사한 칵테일</p>
            <div className="cocktail_similar">
              <img className="cocktail_similar_image" src={cocktailImage} alt={cocktailImage}></img>
              <div className="cocktail_similar_name">유사 칵테일 이름<VscLinkExternal/></div>
            </div>
          </div>
          <div className="inner_right">
            <div className="cocktail_recipe">
              <div className="name">칵테일 이름</div>
              <hr />
              <div className="info">
                <div className="info_left">
                  <p>재료: </p>
                  <span className="ingredient">레몬 위스키 ...</span>
                  <p>도수: </p>
                  <span className="alchol">소주 1잔</span>
                  <p>기법: </p>
                  <span className="technic">shake</span>
                  <p>추천잔: </p>
                  <span className="glass">cup</span>
                </div>
                <div className="info_right">
                  <p>레시피: </p>
                  <span className="order">1.어쩌고 2.저쩌고</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserTipList />
      </div>
    </div>
  );
};

export default CocktailDetail;
