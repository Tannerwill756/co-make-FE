import React from "react";

const ProfilePosts = (props) => {
  console.log("Profileposts!!!!", props.userPosts);
  return (
    <div>
      {props.userPosts.map((posts) => {
        return (
          <div key={posts.id}>
            <h3>{posts.title}</h3>
            <p>{posts.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProfilePosts;
