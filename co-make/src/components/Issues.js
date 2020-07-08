import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {getAllIssues} from '../store/actions/actions';
import Issue from './Issue';

const Issues = (props) => {
    const getIssues = props.getAllIssues;



    useEffect(()=>{
        getIssues();
    }, [])


    return (
        <div>
            {props.issues.map((issue)=> (
                <div key={issue.id}>
                    <Issue issue={issue} />
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    issues: state.mainReducer.issues
  };
};

export default connect(mapStateToProps, {
  getAllIssues
})(Issues);