import React, {useState} from "react";
import './CommunityPostWrite.css'
import Sidebar from "../../component/common/sidebar/Sidebar";
import CocktailCard from "../../component/cocktailCard";

const CommunityPostWrite = () => {

  const [title, setTitle] = useState("");
  const onChangeTitle = (e) => {setTitle(e.target.value);};
  const [type, setType] = useState("");
  const onChangeType = (e) => {setType(e.target.value);};
  const [content, setContent] = useState('');
  const onChangeContent = (e) => {setContent(e.target.value);};

  return (
    <div className="CommunityPostWrite">
      <Sidebar />
      <form className="write_wrap" action="">
        <select className="write_type" name="type" value={type} onChange={onChangeType}>
          <option name="type" value={"tip"}>Tip</option>
          <option name="type" value={"recipe"}>Recipe</option>
        </select>
        <input type="text" name="title" value={title} placeholder="Title:" className="write_title" onChange={onChangeTitle}></input>
        <hr />
        <textarea className="write_content" value={content} placeholder="content" onChange={onChangeContent}>
          content
        </textarea>
        <input type="submit" value="Done" className="write_submit"/>
      </form>
      <CocktailCard />
    </div>
  );
};

export default CommunityPostWrite;
