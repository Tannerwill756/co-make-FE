import React from 'react';
import {connect} from 'react-redux';
import { Formik, Form, useField } from 'formik';
import { TextField, Button } from '@material-ui/core';
import * as yup from 'yup';

import {registerAction} from '../store/actions/actions';

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
    confirmPassword: yup.string().required("password is a required field").test("passwords-match", "Passwords must match", function(value){
        return this.parent.password === value;
    })
})  

const Register = (props) => {

    return (
        <div>
            <h2>Create your account</h2>
            <Formik
                validateOnChange={true}
                initialValues={{username:"", password:"", confirmPassword:""}}
                validationSchema={validationSchema}
                onSubmit={(data, {setSubmitting}) => {
                    setSubmitting(true);
                    data = {
                        username: data.username,
                        password: data.password
                    }
                    console.log('submit:', data);
                    props.registerAction(data)
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
                    <MyTextField 
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        type="password"
                    />
                    <br/>
                    <Button type="submit">Register</Button>
                </Form>
            )}</Formik>
        </div>
    )
}


const mapStateToProps = state => {
    return{}
}

export default connect(
    mapStateToProps,
    {registerAction}
)(Register);