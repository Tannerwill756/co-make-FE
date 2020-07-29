import React from "react";
import "../styling/profileStyling.css";

const ProfileInfo = (props) => {
  return (
    <div className="profileInfo">
      <h2>{props.userInfo.username}</h2>
      <h2>{props.userInfo.email}</h2>
      <h2>{props.userInfo.firstName}</h2>
      <h2>{props.userInfo.lastName}</h2>
      <h2>{props.userInfo.age}</h2>
    </div>
  );
};

export default ProfileInfo;
