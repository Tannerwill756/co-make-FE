import React, { useImperativeHandle } from 'react';
import { Formik, Field, Form, useField } from 'formik';
import { TextField, Button } from '@material-ui/core';
import * as yup from 'yup';

const MyTextField = ({placeholder, ...props}) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return(
        <TextField placeholder={placeholder} {...field} helperText={errorText} error={!!errorText}/>
    )
}

const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required().test("passwords-match", "Passwords must match", function(value){
        return this.parent.password === value;
    })
})

const Register = () => {

    return (
        <div>
            <h2>Create your account</h2>
            <Formik
                validateOnChange={true}
                initialValues={{username:"", password:""}}
                validationSchema={validationSchema}
                // validate= {values => {
                //     const errors = {}

                //     if (values.username.includes("")){
                //         errors.username = "Please choose a username"
                //     }
                //     if (values.password.includes("")){
                //         errors.password = "Plase choose a password"
                //     }
                //     if(values.password2.includes(!values.password)){
                //         errors.password2 = "Passwords do not match"
                //     }
                //     return errors
                // }}
                onSubmit={(data, {setSubmitting}) => {
                    setSubmitting(true);
                    console.log('submit:', data);
                    setSubmitting(false);
                }}
            >{({ values, errors, isSubmitting}) => (
                <Form >
                    <MyTextField 
                        placeholder="Username"
                        name="username"
                        type="input"
                        
                    />
                    <MyTextField 
                        placeholder="Password"
                        name="password"
                        type="password"
                    />
                    <MyTextField 
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        type="password"
                    />
                    
                    <Button type="submit">Register</Button>
                </Form>
            )}</Formik>
        </div>
    )
}


export default Register;