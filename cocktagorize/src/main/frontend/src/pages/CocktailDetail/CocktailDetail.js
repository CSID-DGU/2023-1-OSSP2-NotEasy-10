import React from "react";
import Sidebar from "../../component/common/sidebar/Sidebar"
import '../CocktailDetail/CocktailDetail.css'

const CocktailDetail = () => {
  return (
    <div className='CocktailDetail'>
      <Sidebar />
      <div className='content'>
        <div className="tags">태그들</div>
        <div className="inner">
          <div className="inner_left">
            <div className="cocktail_card">
              칵테일 카드사진
            </div>
            <div className="cocktail_similar">
              비슷한 칵테일
            </div>
          </div>
          <div className="inner_right">
            <div className="cocktail_recipe">
              칵테일 레시피
            </div>
            <div className="cocktail_tip">
              댓글형식의 팁
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetail;
