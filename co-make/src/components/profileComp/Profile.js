import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { getProfile } from "../../store/actions/actions";
import ProfilePosts from "./ProfilePosts";
import ProfileInfo from "./ProfileInfo";
import "../styling/profileStyling.css";

const Profile = (props) => {
  const { id } = useParams();

  useEffect(() => {
    props.getProfile(id);
  }, [id]);

  return (
    <div className="parentProfile">
      <ProfileInfo userInfo={props.userInfo} />
      <ProfilePosts userPosts={props.userPosts} />
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log("user post info!!", state.mainReducer.userPosts);
  console.log("user profile info!", state.mainReducer.userInfo);
  return {
    userPosts: state.mainReducer.userPosts,
    userInfo: state.mainReducer.userInfo,
  };
};

export default connect(mapStateToProps, { getProfile })(Profile);
