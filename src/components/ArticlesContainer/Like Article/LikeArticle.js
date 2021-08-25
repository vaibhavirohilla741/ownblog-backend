import React, { useState, useEffect } from "react";
import axios from "axios";
import dev from "../../../config/dev.json";

const LikesArticle = (props) => {
  const [likes, setLikes] = useState();
  const [likeMessage, setLikeMessage] = useState("like");

  useEffect(()=>{
    axios
    .post(`${dev.baseURL}/articles/${props.match.params.id}`)
    .then(res => setLikes(res.data.likes))
  },[]);
  const likeHandler = () => {
    axios
      .post(`${dev.baseURL}/articles/${props.match.params.id}`,{likeMessage})
      .then((res) => setLikes(res.data.likes));
    if (likeMessage === "like") {
      setLikeMessage("unlike");
    } else {
      setLikeMessage("like");
    }
  };
  return (
    <div className="col-sm-2 p-3">
      <button className="btn btn-outline-success" onClick={likeHandler}>
     {likeMessage}
      </button> <span> {likes}</span> 
    </div>
  );
};

export default LikesArticle;
