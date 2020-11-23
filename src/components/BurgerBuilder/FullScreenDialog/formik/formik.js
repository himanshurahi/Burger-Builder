import React from "react";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { makeOrder } from "../../../../ReduxPlayground/Actions/actions_creator";

function Basic(props) {
  return (
    <div style={{ marginTop: "20px" }}>
      <Formik
        initialValues={{ name: "", email: "", number: "", address: "" }}
        validate={(values) => {
          const errors = {};
          //name
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.number) {
            errors.number = "Required";
          } else if (String(values.number).length != 10) {
            errors.number = "Invalid Mobile Number";
          }
          if (!values.address) {
            errors.address = "Required";
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
          let finalData = {
            ...values,
            ...props.ing,
            email: props.userData.email,
            uid: props.userData.uid,
          };
          props.makeOrder(finalData);
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
              type="text"
              name="name"
              label="Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={errors.name ? true : false}
              helperText={errors.name && touched.name && errors.name}
              fullWidth
            />
            {/* <p>{dirty ? "ok" : "no"}</p> */}
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
            <TextField
              type="number"
              name="number"
              label="Phone Number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.number}
              error={errors.number ? true : false}
              helperText={errors.number && touched.number && errors.number}
              fullWidth
            />
            <TextField
              type="address"
              name="address"
              label="Address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              error={errors.address ? true : false}
              helperText={errors.address && touched.address && errors.address}
              fullWidth
            />

            <Button
              type="submit"
              disabled={!(isValid && dirty) || props.ing.loading}
              variant="contained"
              color="primary"
            >
              Continue
            </Button>
            {/* <button type="submit" disabled={isSubmitting}>
            Submit
          </button> */}
          </form>
        )}
      </Formik>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ing: state.burger, userData: state.auth.userData };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    makeOrder: (data) => dispatch(makeOrder(data, ownProps)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Basic));
