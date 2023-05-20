import React, {useState} from "react";
import './CommunityPostModify.css'
import Sidebar from "../../component/common/sidebar/Sidebar";
import CocktailCard from "../../component/cocktailCard";

const CommunityPostModify = () => {
  const [title, setTitle] = useState("");
  const onChangeTitle = (e) => {setTitle(e.target.value);};
  const [type, setType] = useState("");
  const onChangeType = (e) => {setType(e.target.value);};
  const [content, setContent] = useState('');
  const onChangeContent = (e) => {setContent(e.target.value);};

  return (
    <div className="CommunityPostModify">
      <Sidebar />
      <form className="edit_wrap" action="">
        <select className="edit_type" name="type" value={type} onChange={onChangeType}>
          <option name="type" value={"tip"}>Tip</option>
          <option name="type" value={"recipe"}>Recipe</option>
        </select>
        <input type="text" name="title" value={title} placeholder="Title:" className="edit_title" onChange={onChangeTitle}></input>
        <hr />
        <textarea className="edit_content" value={content} placeholder="content" onChange={onChangeContent}>
          content
        </textarea>
        <input type="submit" value="Done" className="edit_submit"/>
      </form>
      <CocktailCard />
    </div>
  );
};

export default CommunityPostModify;
