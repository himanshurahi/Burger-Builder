import React from "react";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import {
  Signup,
  login,
} from "../../../ReduxPlayground/Actions/actions_creator";
import "./login.css";
import SimpleSnackbar from "../Snackbar/Snackbar";
function Auth(props) {
  const [isSignUp, SetisSignUp] = React.useState(true);
  const switchModeHandler = () => {
    SetisSignUp((prev) => !prev);
  };

  return (
    <Container>
      <div className="myForm">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            //name
            if (!values.password) {
              errors.password = "Required";
            }

            //Email
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            //   console.log(errors);
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            //   setSubmitting(true);
            if (isSignUp) {
              props.singup(values);
            } else {
              props.login(values);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            dirty,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} style={{ lineHeight: "75px" }}>
              <TextField
                type="email"
                name="email"
                label="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email ? true : false}
                helperText={errors.email && touched.email && errors.email}
                fullWidth
              />
              {/* <p>{dirty ? "ok" : "no"}</p> */}
              <TextField
                type="password"
                name="password"
                label="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={errors.password ? true : false}
                helperText={
                  errors.password && touched.password && errors.password
                }
                fullWidth
              />

              <Button
                type="submit"
                disabled={!(isValid && dirty) || props.auth.loading}
                variant="contained"
                color="primary"
              >
                {isSignUp ? "Sign Up" : "Login"}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: "20px" }}
                onClick={switchModeHandler}
              >
                {isSignUp ? "Switch to login" : "Switch to Sign Up"}
              </Button>
              {/* <button type="submit" disabled={isSubmitting}>
            Submit
          </button> */}
            </form>
          )}
        </Formik>
      </div>
      <SimpleSnackbar />
    </Container>
  );
}

const MapStateToProps = (state) => {
  return { auth: state.auth };
};

const MapDispatchToProps = (dispatch, ownProps) => {
  return {
    singup: (values) => dispatch(Signup(values)),
    login: (values) => dispatch(login(values, ownProps)),
  };
};

export default withRouter(connect(MapStateToProps, MapDispatchToProps)(Auth));
