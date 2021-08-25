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
const Article = (props) => {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [authorname, setAuthorname] = useState("");

  useEffect(() => {
    axios
      .get(`${dev.baseURL}/articles/${props.match.params.id}`)
      .then((res) => [
        setTitle(res.data.title),
        setArticle(res.data.article),
        setAuthorname(res.data.authorname),
      ])
      .catch((error) => console.log(error));
  }, [props]);
  return (
    <ArticleContainer>
      {!title || !article || !authorname ? (
        <Spinner />
      ) : (
        <>
          <h2>{title}</h2>
          <p>{article}</p>
          <p
            style={{
              backgroundColor: "grey",
              color: "white",
              padding: "5px",
              borderRadius: "2px",
              width: "140px",
            }}
          >
            {authorname}
          </p>
        </>
      )}
      <br />
      <Link to="/" type="submit" className="btn btn-primary">
        Back to Home
      </Link>
    </ArticleContainer>
  );
};

export default Article;
