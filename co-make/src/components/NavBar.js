import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const NavBar = (props) => {

    return(
        <div className="navLinks">
            {(props.signedIn) ? <p>Welcome, {props.username}</p> : ""}
            {(props.signedIn) ? null : <Link className="link" to="/register"> Register </Link>}
            {(props.signedIn) ? <Link className="link" to=""> logout</Link> : <Link className="link" to="/login"> Login</Link>}
            {(props.signedIn) ? <Link className="link" to="/issueform">New Issue</Link> : null}
            {(props.signedIn) ? <Link className="link" to="/issues">Home</Link> : null}
        </div>
    )
}


const mapStateToProps = state => {
    return{
        username: state.mainReducer.username,
        signedIn: state.mainReducer.signedIn
    }
}

export default connect(
    mapStateToProps,
    {}
)(NavBar);