import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import dev from "../../config";
import Spinner from "../Spinner/Spinner";
import axios from "axios";

const MainContainer = styled.div`
  margin: 7rem 0;
`;

const Articles = ({ posts }) => {
  return (
    <MainContainer>
      {!posts.length ? (
        <Spinner />
      ) : (
        posts.map((article, key) => (
          <div className="container" key={key}>
            <Link
              to={{
                pathname: `/article/${article._id}`,
              }}
              style={{ textDecoration: "none" }}
            >
              <h2>{article.title}</h2>
            </Link>

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
              <div className="col-sm-2"></div>
              <div className="col-sm-2"></div>
            </div>
          </div>
        ))
      )}
    </MainContainer>
  );
};

export default Articles;
