import React, { useState } from "react";
import styled from "styled-components";
import dev from "../../config";
import axios from "axios";

const RegisterContainer = styled.div`
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

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const changeOnClick = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    setName("");
    setEmail("");
    setPassword("");
    console.log("user: ", user);
    axios
      .post(`${dev.baseURL}/users/signup`, user)
      .then((res) => {
        console.log("success", res.data);
        localStorage.setItem("token", res.data);
        setMessage("Registeration Successful!");
      })
      .catch((err) => setMessage("Email Exist!"));
  };

  return (
    <RegisterContainer>
      <div className="container">
        <h1>Join Us</h1>
        <span className="message">{message}</span>
        <form onSubmit={changeOnClick} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="authorname">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Your Name"
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
              placeholder="Email"
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
            Register
          </button>
        </form>
      </div>
    </RegisterContainer>
  );
};

export default Register;
