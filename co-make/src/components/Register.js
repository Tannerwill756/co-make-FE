import React from "react";
import { connect } from "react-redux";
import { Formik, Form, useField } from "formik";
import { TextField, Button } from "@material-ui/core";
import * as yup from "yup";

import { registerAction } from "../store/actions/actions";

const MyTextField = ({ placeholder, type, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      type={type}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required("password is a required field")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
  email: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number().required(),
});

const Register = (props) => {
  return (
    <div>
      <h2>Create your account</h2>
      <Formik
        validateOnChange={true}
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
          email: "",
          firstName: "",
          lastName: "",
          age: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          data = {
            username: data.username,
            password: data.password,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            age: Number(data.age),
          };
          console.log("submit:", data);
          props.registerAction(data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <MyTextField placeholder="Username" name="username" type="input" />
            <br />
            <MyTextField
              placeholder="Password"
              name="password"
              type="password"
            />
            <br />
            <MyTextField
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <br />
            <MyTextField placeholder="Email" name="email" type="input" />
            <br />
            <MyTextField
              placeholder="First Name"
              name="firstName"
              type="input"
            />
            <br />
            <MyTextField placeholder="Last Name" name="lastName" type="input" />
            <br />
            <MyTextField placeholder="Age" name="age" type="input" />
            <br />
            <Button type="submit">Register</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.mainReducer.username,
  };
};

export default connect(mapStateToProps, { registerAction })(Register);
