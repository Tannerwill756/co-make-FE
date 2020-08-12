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
  }, [id, props.getProfile]);

  return (
    <div>
      {!props.userInfo ? (
        <div> ...Loading </div>
      ) : (
        <div className="parentProfile">
          <ProfileInfo userInfo={props.userInfo} />
          <ProfilePosts userPosts={props.userPosts} />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userPosts: state.mainReducer.userPosts,
    userInfo: state.mainReducer.userInfo,
  };
};

export default connect(mapStateToProps, { getProfile })(Profile);
