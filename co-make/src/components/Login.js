import React from "react";
import { connect } from "react-redux";
import { Formik, Form, useField } from "formik";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";

import "./styling/loginStyling.css";

import { loginAction } from "../store/actions/actions";

const useStyles = makeStyles({
  resize: {
    fontSize: 20,
  },
});

const MyTextField = ({ placeholder, type, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  const classes = useStyles();
  return (
    <TextField
      placeholder={placeholder}
      type={type}
      {...field}
      helperText={errorText}
      error={!!errorText}
      className="txtfield"
      InputProps={{
        classes: {
          input: classes.resize,
        },
      }}
    />
  );
};

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Login = (props) => {
  return (
    <div className="mainL">
      <div className="inner">
        <h2>Member Login</h2>
        <Formik
          validateOnChange={true}
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            props.loginAction(data);
          }}
        >
          {() => (
            <Form className="form">
              <MyTextField
                placeholder="Username"
                name="username"
                type="input"
                className="txtfield"
              />
              <br />
              <MyTextField
                placeholder="Password"
                name="password"
                type="password"
                className="txtfield"
              />

              <br />
              <Button type="submit">Sign in</Button>
            </Form>
          )}
        </Formik>
        <div>{props.error}</div>
        <p>
          Dont have an account yet? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.mainReducer.error,
  };
};

export default connect(mapStateToProps, { loginAction })(Login);
