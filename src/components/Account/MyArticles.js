import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import dev from "../../config";
import { Link } from "react-router-dom";

const ArticleContainer = styled.div`
  margin: 6rem auto;
  padding: 3rem 14rem;

  h2 {
    text-align: center;
    font-weight: 900;
    color: #277;
  }
  .btn-primary {
    background: #277;
    border: none;
    &:hover {
      background: #299;
    }
  }
`;
const Article = () => {
  const deleteArticle = (id) => {
    axios
      .delete(`${dev.baseURL}/articles/${id}`)
      .then((res) => alert(res.data));
    setArticle(article.filter((elem) => elem._id !== id));
  };
 
  const [myPosts, setMyPosts] = useState([]);
  const [article, setArticle] = useState([]);
  const [message, setMessage] = useState("")

  useEffect(() => {
    const body = {
      token: localStorage.getItem("token"),
    };

    axios
      .post(`${dev.baseURL}/articles/myarticles`, { ...body })
      .then((res) => setMyPosts(res.data))
      .catch((error) => setMessage("Error"));
  }, []);
  return (
    <ArticleContainer>
      {!myPosts.length ? (
        <Spinner />
        
      ) :  (
        myPosts.map((article, key) => (
          <div className="container" key={key}>
           <h2>{article.title}</h2>

            <p>{article.article}</p>
            <span
              style={{
                backgroundColor: "grey",
                color: "white",
                padding: "5px",
                borderRadius: "2px",
              }}
            >
              {article.authorname}
            </span>
            <div className="row my-5">
            <div className="col-sm-2">
            <Link
                  to={`/update/${article._id}`}
                  className="btn btn-outline-success"
                >
                  Edit Article
                </Link>
                </div>
              <div className="col-sm-2">
              <button
                  onClick={() => deleteArticle(article._id)}
                  className="btn btn-outline-danger"
                >
                  Delete Article
                </button>
              </div>
              <div className="col-sm-2">
               
              </div>
            </div>
          </div>
        ))
      )}
      
    </ArticleContainer>
  );
};

export default Article;
