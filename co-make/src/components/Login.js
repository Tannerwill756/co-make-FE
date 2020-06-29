import React, { useState } from 'react';
import {connect} from 'react-redux';

import {loginAction} from '../store/actions/actions';


const Login = () => {

    const [form, setForm] = useState({
        username : "",
        password : ""
    })

    const changeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault();
        console.log(form)
    }

    return (
        <>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
            <label>Username: </label>
            <input
                type='text'
                name='username'
                placeholder='username'
                value={form.username}
                onChange={changeHandler}
            />

            <label>Password: </label>
            <input
                type='password'
                name='password'
                placeholder='password'
                value={form.password}
                onChange={changeHandler}
            />

            <button>Login</button>
        </form>
        </>
    )
}

const mapStateToProps = state => {
    return null;
}

export default connect(
    mapStateToProps,
    {loginAction}
)(Login);