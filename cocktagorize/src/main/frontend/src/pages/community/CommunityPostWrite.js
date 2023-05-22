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

  const onClickSubmit = () => {
    //axios로 type, title, content 추가사항 post
  };

  return (
    <div className="CommunityPostWrite">
      <Sidebar />
      <form className="write_wrap" action="">
        <p>커뮤니티 글쓰기</p>
        <select className="write_type" name="type" value={type} onChange={onChangeType}>
          <option name="type" value={"tip"}>Tip</option>
          <option name="type" value={"recipe"}>Recipe</option>
        </select>
        <input type="text" name="title" value={title} placeholder="제목을 입력하세요" className="write_title" onChange={onChangeTitle}></input>
        <hr />
        <textarea className="write_content" value={content} placeholder="내용을 작성해주세요" onChange={onChangeContent}>
        </textarea>
        <input type="submit" value="Done" className="write_submit" onClick={onClickSubmit}/>
      </form>
      <CocktailCard />
    </div>
  );
};

export default CommunityPostWrite;
