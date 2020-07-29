import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import up from "../images/up.png";
import down from "../images/down.png";
import { addLike, deleteIssue, removeLike } from "../store/actions/actions";
import "./styling/issueStyling.css";

const Issue = (props) => {
  const { push } = useHistory();

  const upVote = (issue) => {
    const newissue = {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      upVotes: issue.upVotes,
      user_id: issue.user_id,
    };
    const votes = parseInt(issue.upVotes) + 1;

    axiosWithAuth()
      .put(`/api/issues/${issue.id}`, { ...newissue, upVotes: votes })
      .then((res) => {
        props.addLike(issue.id);
      });
  };

  const downVote = (issue) => {
    const newissue = {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      upVotes: issue.upVotes,
      user_id: issue.user_id,
    };
    const votes = parseInt(issue.upVotes) - 1;

    axiosWithAuth()
      .put(`/api/issues/${issue.id}`, { ...newissue, upVotes: votes })
      .then((res) => {
        props.likes.map((num) => {
          console.log("maping through", num);
          if (num === issue.id) {
            const index = props.likes.indexOf(num);

            props.likes.splice(index, 1);
            props.removeLike(issue.id);
          }
        });
      });
  };

  const upVoteLogic = (postId) => {
    props.likes.map((someId) => {
      if (postId === someId) {
        return true;
      } else {
        return false;
      }
    });
    // return true;
  };

  return (
    <div className="iss">
      {props.isFetching ? <h2>... Loading</h2> : null}

      <div className="user">
        <p onClick={() => push(`/profile/${props.issue.user_id}`)}>
          <i class="far fa-user"></i>
          {props.issue.username}
        </p>
      </div>
      <div className="infoVotes">
        <div className="info">
          <h3>{props.issue.title}</h3>
          <p>{props.issue.description}</p>
        </div>
        <div className="votes">
          <img
            src={up}
            className="upArr"
            alt="up vote arrow"
            onClick={() => upVote(props.issue)}
          />
          <span>{props.issue.upVotes}</span>
          <img
            src={down}
            alt="down vote arrow"
            className="dwnArr"
            onClick={() => downVote(props.issue)}
          />
        </div>
      </div>
      {props.issue.user_id === Number(localStorage.getItem("user_id")) ? (
        <div className="editDelete">
          <i
            class="far fa-edit fa-3x"
            onClick={() => push(`/editissue/${props.issue.id}`)}
          ></i>

          <i
            class="fas fa-times fa-3x"
            onClick={() => props.deleteIssue(props.issue.id)}
          ></i>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    likes: state.likesReducer.likes,
    isFetching: state.mainReducer.isFetching,
  };
};

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deleteIssue,
})(Issue);
