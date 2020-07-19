import React from "react";
import { connect } from "react-redux";
import { Formik, Form, useField } from "formik";
import { TextField, Button } from "@material-ui/core";
import * as yup from "yup";

import { editPost } from "../store/actions/actions";
import { useParams, useHistory } from "react-router-dom";

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

const DescripTextField = ({ placeholder, type, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      type={type}
      {...field}
      helperText={errorText}
      error={!!errorText}
      multiline
      rows={5}
    />
  );
};

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
});

const EditIssue = (props) => {
  const { id } = useParams();
  const { push } = useHistory();
  return (
    <div>
      <h2>Edit issue</h2>
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
          props.editPost(id, data);
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
            <Button type="submit">Confirm Edit</Button>
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

export default connect(mapStateToProps, { editPost })(EditIssue);