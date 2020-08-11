import React from "react";
import "../styling/profileStyling.css";

const ProfilePosts = (props) => {
  return (
    <div className="profilePosts">
      {props.userPosts.length === 0 ? (
        <div className="emptyPosts">This user hasn't posted anything yet</div>
      ) : (
        props.userPosts.map((posts) => {
          return (
            <div key={posts.id} className="indvPost">
              <h3>{posts.title}</h3>
              <p>{posts.description}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProfilePosts;
