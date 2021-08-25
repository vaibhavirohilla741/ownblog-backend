import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import dev from "./config/dev.json"
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Articles from "./components/ArticlesContainer/Articles/Articles";
import AddArticle from "./components/ArticlesContainer/Add Article/AddArticle";
import Article from "./components/ArticlesContainer/Article/Article";
import EditArticle from "./components/ArticlesContainer/Edit Article/EditArticle";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import MyAccount from "./components/Account/MyAccount";
import MyArticles from "./components/ArticlesContainer/MyArticles";
import { connect } from "react-redux";

function App(props) {
  
  const [posts, setPosts] = useState([]);
  const getArticles = () => {
    axios
      .get("/articles")
      .then((res) => setPosts(res.data))
      .catch((error) => console.log(error));
  };
  const getUser = () => {
    let userDetail =[]
    axios
      .post(`${dev.baseURL}/users/me`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        userDetail.push(res.data);
        console.log("User ", userDetail);
        props.dispatch({ type: "SET_USER", payload: userDetail });
        
      })
      .catch((e) => console.log("error: ", e));
  };
  useEffect(() => {
    getArticles();
    getUser()
  }, []);

  return (
    <div className="App">
      <Header />
      <Navbar />
      <Route exact path="/" render={() => <Articles posts={posts} />} />
      <Route path="/add-article" component={AddArticle} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/my-article" component={MyArticles} />

      <Route path="/profile" component={MyAccount} />
      <Route
        path="/article/:id"
        render={(props) => <Article {...props} posts={posts} />}
      />
      <Route
        path="/update/:id"
        render={(props) => <EditArticle {...props} posts={posts} />}
      />

      <Footer />
    </div>
  );
}

export default connect()(App);
