import React, { useContext, useState } from "react";
import styled from "styled-components";
import { VscHeartFilled, VscHeart } from "react-icons/vsc";
import "../component/UserTip.css";
import axios from "axios";
import { DELETE, PUT } from "../jwt/fetch-auth-action";
import { createTokenHeader } from "../jwt/auth-action";
import AuthContext from "../jwt/auth-context";
import { useParams } from "react-router-dom";

const UserTip = (tip) => {
	const { cocktail_id } = useParams();

	const [isEditing, setIsEditing] = useState(false);
	const [editedComment, setEditedComment] = useState(tip.tip.content);

	const authCtx = useContext(AuthContext);
	let isLogin = authCtx.isLoggedIn;
	let isGetUser = authCtx.isGetUserSuccess;

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleDelete = () => {
		// axios로 삭제요청 보내면 서버에서 replyList 업데이트해야함
		console.log("삭제된 댓글 아이디:", tip.tip.id);
		const result = DELETE(
			`http://localhost:8080/cocktail/${cocktail_id}/reply/${tip.tip.id}`,
			createTokenHeader(authCtx.token)
		);
		result.then((result) => {
			if (result !== null) {
				alert("댓글이 삭제되었습니다!");
				window.location.replace(`/cocktail/${cocktail_id}`);
			}
		});
	};

	const handleSave = () => {
		// axios로 수정된 사항('content: editedComment')을 보내면 서버에서 replyList에서 해당 변경내용을 업데이트해야함
		console.log("수정된 내용:", editedComment);
		setIsEditing(false);
		const result = PUT(
			`http://localhost:8080/cocktail/${cocktail_id}/reply/${tip.tip.id}`,
			{
				content: editedComment,
			},
			createTokenHeader(authCtx.token)
		);
		result.then((result) => {
			if (result !== null) {
				alert("댓글이 수정되었습니다!");
				window.location.replace(`/cocktail/${cocktail_id}`);
			}
		});
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setEditedComment(tip.tip.content);
	};

	const handleEditedCommentChange = (event) => {
		setEditedComment(event.target.value);
	};

	function timeConvert(time) {
		return new Date(time).toLocaleString(); // Date 형식으로 변환
	}

	console.log(tip.tip);

	return (
		<div className="UserTip">
			<div>
				<div className="tip">
					<p className="tip_name">{tip.tip.user.nickname}</p>
					{isEditing ? (
						<textarea
							className="tip_content"
							value={editedComment}
							onChange={handleEditedCommentChange}
						></textarea>
					) : (
						<p className="tip_content">{tip.tip.content}</p>
					)}
					<p className="tip_createdDate">
						{timeConvert(tip.tip.createdDate)}
					</p>
					<hr />
				</div>
				{tip.tip.user.nickname === authCtx.userObj.nickname && (
					<div className="tool">
						{isEditing ? (
							<>
								<button
									className="tool_save"
									onClick={handleSave}
								>
									저장
								</button>
								<button
									className="tool_cancel"
									onClick={handleCancelEdit}
								>
									취소
								</button>
							</>
						) : (
							<>
								<button
									className="tool_edit"
									onClick={handleEdit}
								>
									수정
								</button>
								<button
									className="tool_delete"
									onClick={handleDelete}
								>
									삭제
								</button>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default UserTip;
