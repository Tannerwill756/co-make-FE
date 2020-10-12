import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllIssues } from "../store/actions/actions";
import Issue from "./Issue";
import "./styling/issueStyling.css";

const Issues = (props) => {
  const getIssues = props.getAllIssues;

  useEffect(() => {
    getIssues();
  }, [getIssues]);

  const fullArr = [];
  props.issues.map((issue) => {
    return fullArr.push(issue);
  });
  fullArr.sort(function (a, b) {
    return b.upVotes - a.upVotes;
  });

  return (
    <div className="parent">
      {fullArr.map((issue) => (
        <div key={issue.id} className="indvIssue">
          <Issue issue={issue} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    issues: state.mainReducer.issues,
    isFetching: state.mainReducer.isFetching
  };
};

export default connect(mapStateToProps, {
  getAllIssues,
})(Issues);
