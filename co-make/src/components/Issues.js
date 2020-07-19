import React, { useEffect, useState } from "react";
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
    fullArr.push(issue);
  });
  fullArr.sort(function (a, b) {
    return b.upVotes - a.upVotes;
  });

  return (
    <div className="parent">
      {fullArr.map((issue) => (
        <div key={issue.id}>
          <Issue issue={issue} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    issues: state.mainReducer.issues,
  };
};

export default connect(mapStateToProps, {
  getAllIssues,
})(Issues);
