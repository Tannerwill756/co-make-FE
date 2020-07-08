import React from 'react';
import {connect} from 'react-redux';
import { Formik, Form, useField } from 'formik';
import { TextField, Button } from '@material-ui/core';
import * as yup from 'yup';


import {loginAction} from '../store/actions/actions';

const MyTextField = ({placeholder, type, ...props}) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return(
        <TextField placeholder={placeholder} type={type} {...field} helperText={errorText} error={!!errorText}/>
    )
}

const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
})  

const Login = (props) => {
    return (
        <div>
            <h2>Login</h2>
            <Formik
                validateOnChange={true}
                initialValues={{username:"", password:""}}
                validationSchema={validationSchema}
                onSubmit={(data, {setSubmitting}) => {
                    setSubmitting(true);
                    props.loginAction(data)
                    setSubmitting(false);
                    
                }}
            >{({ values, errors, isSubmitting}) => (
                <Form >
                    <MyTextField 
                        placeholder="Username"
                        name="username"
                        type="input"
                        
                    />
                    <br/>
                    <MyTextField 
                        placeholder="Password"
                        name="password"
                        type="password"
                    />
                    
                    <br/>
                    <Button type="submit">Login</Button>
                </Form>
            )}</Formik>
            <div>
                {props.error}
            </div>
            
        </div>
    )
}


const mapStateToProps = state => {
    return{
        error: state.mainReducer.error
    }
}

export default connect(
    mapStateToProps,
    {loginAction}
)(Login);