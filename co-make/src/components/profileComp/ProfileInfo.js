import React from "react";

const ProfileInfo = (props) => {
  console.log("Profileposts!!!!", props.userInfo);
  return (
    <div>
      <h2>{props.userInfo.username}</h2>
      <h2>{props.userInfo.email}</h2>
      <h2>{props.userInfo.firstName}</h2>
      <h2>{props.userInfo.lastName}</h2>
      <h2>{props.userInfo.age}</h2>
    </div>
  );
};

export default ProfileInfo;
