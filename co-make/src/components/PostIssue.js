import React from "react";
import { connect } from "react-redux";
import { Formik, Form, useField } from "formik";
import { TextField, Button } from "@material-ui/core";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./styling/postIssue.css";
import { createIssue } from "../store/actions/actions";

const useStyles = makeStyles({
  resize: {
    fontSize: 15,
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

const DescripTextField = ({ placeholder, type, ...props }) => {
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
      multiline
      rows={5}
      className="descfield"
      InputProps={{
        classes: {
          input: classes.resize,
        },
      }}
    />
  );
};

const validationSchema = yup.object({
  title: yup.string().required().max(255),
  description: yup.string().required().max(255),
});

const PostIssue = (props) => {
  const { push } = useHistory();
  return (
    <div className="mainDiv">
      <h2>Describe your issue here</h2>
      <Formik
        validateOnChange={true}
        initialValues={{ title: "", description: "" }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          data = {
            user_id: Number(localStorage.getItem("user_id")),
            title: data.title,
            description: data.description,
            upVotes: 0,
          };
          console.log("data being sent from form", data);
          props.createIssue(data);
          push("/issues");
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <MyTextField placeholder="title" name="title" type="input" />
            <br />
            <DescripTextField
              placeholder="description"
              name="description"
              type="input"
            />

            <br />
            <Button className="submitB" type="submit">
              Submit your Issue
            </Button>
          </Form>
        )}
      </Formik>
      <div>{props.error}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.mainReducer.error,
  };
};

export default connect(mapStateToProps, { createIssue })(PostIssue);
