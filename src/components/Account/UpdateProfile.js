import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dev from "../../config";
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

const EditArticle = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const changeOnClick = (e) => {
    e.preventDefault();
    const users = {
      name,
      email,
      password,
    };
    setName("");
    setEmail("");
    setPassword("");
    axios
      .put(`${dev.baseURL}/users/update/${props.match.params.id}`, users)
      .then(setMessage("Profile updated successully!"))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    axios
      .get(`${dev.baseURL}/users/6107d59bf3a3bd28f8a5d10b`)
      .then((res) => [
        setName(res.data.name),
        setEmail(res.data.email),
        setPassword(res.data.password),
      ])
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <AddArticleContainer>
      <div className="container">
        <h1>Update Profile</h1>
        <span className="message">{message}</span>
        <form onSubmit={changeOnClick} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </AddArticleContainer>
  );
};

export default EditArticle;
