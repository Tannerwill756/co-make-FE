import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { addLike, deleteIssue, removeLike } from "../store/actions/actions";

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
    <div>
      {props.isFetching ? <h2>... Loading</h2> : null}
      <p onClick={() => push(`/profile/${props.issue.user_id}`)}>
        {props.issue.username}
      </p>
      <h3>{props.issue.title}</h3>
      <p>{props.issue.description}</p>
      <button onClick={() => upVote(props.issue)}>↑ Upvote: </button>
      <button onClick={() => downVote(props.issue)}>down Vote</button>
      <span>{props.issue.upVotes}</span>
      <br />
      {props.issue.user_id === Number(localStorage.getItem("user_id")) ? (
        <div>
          <button onClick={() => push(`/editissue/${props.issue.id}`)}>
            Edit
          </button>
          <button onClick={() => props.deleteIssue(props.issue.id)}>
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("checking state if updated", state.likesReducer);
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
