import React, { useState } from "react";
import styled from "styled-components";
import dev from "../../../config";
import axios from "axios";

const AddArticleContainer = styled.div`
  margin: 3rem auto;
  padding: 4rem;
  width: 50rem;

  h1 {
    font-weight: 900;
    color: #277;
    text-align: center;
  }
  .btn-primary {
    margin-top: 2rem;
    background: #277;
    border: none;
    &:hover {
      background: #299;
    }
  }
  .message {
    font-weight: 900;
    color: green;
    padding: 1rem 1rem 1rem 0;
  }
`;

const AddArticle = (props) => {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [message, setMessage] = useState("");

  const changeOnClick = (e) => {
    let token = localStorage.getItem("token")
    e.preventDefault();
    const articles = {
      title,
      article,
      authorname,
      token
    };
    setTitle("");
    setArticle("");
    setAuthorname("");
    axios
      .post(`${dev.baseURL}/articles/add`, articles)
      .then((res) => setMessage(res.data))
      .catch((error) => console.log(error));
      props.history.push('/my-article');
  };

  return (
    <AddArticleContainer>
      <div className="container">
        <h1>Add New Article</h1>
        <span className="message">{message}</span>
        <form onSubmit={changeOnClick} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="authorname">Author Name</label>
            <input
              type="text"
              value={authorname}
              onChange={(e) => setAuthorname(e.target.value)}
              className="form-control"
              placeholder="Author Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="title"
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="article">Article</label>
            <textarea
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              className="form-control"
              rows="5"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Post Article
          </button>
        </form>
      </div>
    </AddArticleContainer>
  );
};

export default AddArticle;
