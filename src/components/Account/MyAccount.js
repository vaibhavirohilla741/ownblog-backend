import React from "react";
import { connect } from "react-redux";

const MyAccount = (props) => {
  return (
    <div style={{ height: "100vh", alignContent: "center" ,paddingTop:"40px" }}>
       <center><h1>Welcome {props.userDetails[0].name} </h1></center>
      <center><p > We know this is a very less info about you but we are working on it!!</p></center>
      <center><img class="waiting" src="https://media.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif" alt="Time gif" /></center>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userDetails: state.user,
  };
};

export default connect(mapStateToProps, null)(MyAccount);
