import React, {useState} from "react";
import styled from "styled-components";
import {
    VscHeartFilled,
    VscHeart
  } from "react-icons/vsc";

  const LikeButton = () => {

    const [like, setLike] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      if (isClicked) {
        setLike(like-1);
      } else {
        setLike(like+1);
      }
      setIsClicked(!isClicked);
    };

    return (
      <div>
        <VscHeart onClick={handleClick}/><span>{like}</span>
        <VscHeartFilled />
      </div>
    );
  };

  export default LikeButton;