import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

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
        return props.addLike(issue.id);
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
          if (num === issue.id) {
            const index = props.likes.indexOf(num);

            props.likes.splice(index, 1);
            return props.removeLike(issue.id);
          } else {
            return null;
          }
        });
      });
  };

  return (
    <div className="iss">
      {props.isFetching ? <h2>... Loading</h2> : null}

      <div className="user">
        <p onClick={() => push(`/profile/${props.issue.user_id}`)}>
          <i className="far fa-user"></i>
          {props.issue.username}
        </p>
      </div>
      <div className="infoVotes">
        <div className="info">
          <h3>{props.issue.title}</h3>
          <p>{props.issue.description}</p>
        </div>
        <div className="votes">
          <i
            className="fas fa-arrow-up fa-3x upArr"
            onClick={() => upVote(props.issue)}
          ></i>
          <span>{props.issue.upVotes}</span>

          <i
            onClick={() => downVote(props.issue)}
            className="fas fa-arrow-down fa-3x dwnArr"
          ></i>
        </div>
      </div>
      {props.issue.user_id === Number(localStorage.getItem("user_id")) ? (
        <div className="editDelete">
          <i
            className="far fa-edit fa-3x"
            onClick={() => push(`/editissue/${props.issue.id}`)}
          ></i>

          <i
            className="fas fa-times fa-3x"
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
