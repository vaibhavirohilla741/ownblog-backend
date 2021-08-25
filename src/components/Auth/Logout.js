import React, { useState } from "react";
import axios from "axios";
import dev from "../../config";
import Spinner from "../Spinner/Spinner";

const Logout = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const changeOnClick = async () => {

    
  
    console.log("logout", localStorage.getItem("token"));
    try {
      setLoading(true);
      const body = {
        token: localStorage.getItem("token"),
      };
      await axios.post(`${dev.baseURL}/users/logout`, { ...body }).then(() => {
        localStorage.removeItem("token");
        setMessage("Logout Successful!");
        setLoading(false);
        document.location.reload(true)
        
      });
    } catch (e) {
      setMessage("Unable to Logout!");
      setLoading(false);
    }
    

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {message}
          <button onClick={changeOnClick}>Logout</button>
        </div>
      )}
    </div>
  );
}}

export default Logout;
