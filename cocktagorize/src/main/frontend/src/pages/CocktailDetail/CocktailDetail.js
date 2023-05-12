import React, {useEffect, useState} from "react";
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
import {useParams} from "react-router-dom";
import axios from "axios";

const CocktailDetail = () => {
  const {cocktail_id} = useParams();
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    const getCocktailDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/cocktail/${cocktail_id}`);
        console.log(response.data.cocktailTagList);
        setCocktail(response.data);
        // Handle the cocktail data as needed
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    };
    getCocktailDetails();
  }, [])

  if (!cocktail) {
    return null;
  }

  const tagList = cocktail.cocktailTagList.map(tag => <Tag key={tag.id} name={tag.name} />);

  return (
    <div className="CocktailDetail">
      <Sidebar />
      <div className="content">
        <div className="tags">
          {tagList}
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
