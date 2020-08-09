import React from "react";
import "../styling/profileStyling.css";

const ProfileInfo = (props) => {
  return (
    <div className="profileInfo">
      <i className="far fa-id-badge fa-9x"></i>

      <div className="innerInfo">
        <h2>
          <i className="far fa-address-card"></i>
          {props.userInfo.username}
        </h2>

        <h2>
          <i className="far fa-envelope"></i>
          {props.userInfo.email}
        </h2>
        <h2>
          <i className="far fa-user"></i>
          {props.userInfo.lastName}, {props.userInfo.firstName}
        </h2>

        <h2>
          <i className="far fa-hourglass"></i>
          {props.userInfo.age} years old
        </h2>
      </div>
    </div>
  );
};

export default ProfileInfo;
