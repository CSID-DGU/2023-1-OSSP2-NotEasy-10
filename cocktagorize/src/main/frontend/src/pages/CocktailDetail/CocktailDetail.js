import React from "react";
import Sidebar from "../../component/common/sidebar/Sidebar";
import "../CocktailDetail/CocktailDetail.css";
import UserTipList from "../../component/UserTipList";

const CocktailDetail = () => {
  return (
    <div className="CocktailDetail">
      <Sidebar />
      <div className="content">
        <div className="tags">태그들</div>
        <div className="inner">
          <div className="inner_left">
            <div className="cocktail_card">칵테일 카드사진</div>
            <div className="cocktail_similar">비슷한 칵테일</div>
          </div>
          <div className="inner_right">
            <div className="cocktail_recipe">
              <div className="name">칵테일 이름</div>
              <hr />
              <div className="info">
                <div className="info_left">
                  <p>재료: </p>
                  <span className="ingredient">레몬 위스키 ...</span>
                  <p>도수: 소주잔 <span className="alchol">1</span></p>
                  <p>기법: <span className="technic">shake</span></p>
                  <p>추천잔: <span className="glass">cup</span></p>
                </div>
                <div className="info_right">
                  <p>제작순서: </p>
                  <span className="order">1.어쩌고 2.저쩌고</span>
                </div>
              </div>
            </div>
            <UserTipList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetail;
