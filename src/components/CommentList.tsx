import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { TComment } from "../types/comment";

const Comment = styled.div`
  padding: 7px 10px;
  text-align: left;

  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const CreatedAt = styled.div`
  float: right;
  vertical-align: middle;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const Button = styled.div`
  text-align: right;
  margin: 10px 0;
  & > a {
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;

function CommentList() {
  const { comments, apiStatus } = useSelector<any, any>(
    (state) => state.comments
  );
  return (
    <>
      {apiStatus === "DONE" ? (
        comments.map((comment: TComment) => (
          <Comment key={comment.id}>
            <img src={comment.profile_url} alt="" />

            {comment.author}

            <CreatedAt>{comment.createdAt}</CreatedAt>

            <Content>{comment.content}</Content>

            <Button>
              <a>수정</a>
              <a>삭제</a>
            </Button>

            <hr />
          </Comment>
        ))
      ) : apiStatus === "LOADING" ? (
        <p>데이터를 불러오고 있습니다.</p>
      ) : apiStatus === "ERROR" ? (
        <p>에러가 발생했습니다.</p>
      ) : null}
    </>
  );
}

export default CommentList;
