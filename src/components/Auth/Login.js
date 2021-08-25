import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import dev from "../../config";
import Spinner from "../Spinner/Spinner";
import { connect } from "react-redux";

const LoginContainer = styled.div`
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

const Login = (props) => {
  let userDetail = [];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const changeOnClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = {
        email,
        password,
      };
      setEmail("");
      setPassword("");
      await axios
        .post(`${dev.baseURL}/users/login`, user)
        .then((res) => {
          console.log("response data from Login ", res.data);
          localStorage.setItem("token", res.data);
          return axios
            .post(`${dev.baseURL}/users/me`, {
              token: localStorage.getItem("token"),
            })
            .then((res) => {
              
              userDetail.push(res.data);
              console.log("User ", userDetail);
              localStorage.setItem('userDetails', JSON.stringify(userDetail));
             props.dispatch({ type: "SET_USER" , payload:userDetail})
              //setUserId(res.data.name);
            })
            .catch((e) => console.log("error: ", e));
        })
        .then(() => setMessage("Login Successful!"));
      setLoading(false);
      props.history.push('/');
    } catch (error) {
      setMessage("Incorrect email or password");
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <div className="container">
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <h1>Login</h1>

            <span className="message">{message}</span>
            <form onSubmit={changeOnClick} encType="multipart/form-data">
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

              <button
                type="submit"
                className="btn btn-primary"
                
              >
                Login
              </button>
            </form>
          </div>
        )} 
      </div>
    </LoginContainer>
  );
}; 

/* const mapDispatchToProps = (dispatch) => {
  return {
    setUser: () => dispatch({ type: "SET_USER" , payload:userDetail}),
  };
}; */

export default connect()(Login);
