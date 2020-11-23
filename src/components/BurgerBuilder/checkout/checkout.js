import React, { useState } from "react";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Burger from "../Burger/Burger";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../ContactData/ContactData";
import MyFullScreenDialog from "../FullScreenDialog/FullScreenDialog";

import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 275,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function Checkout(props) {
  console.log(Object.keys(props.ing.ing).length);
  const classes = useStyles();

  const [open, Setopen] = useState(false);

  React.useEffect(() => {
    // if (Object.keys(props.ing.ing).length == 0) {
    //   props.history.push({
    //     pathname: "/",
    //     hash: "PleasePlaceOrderFirst",
    //   });
    // }
  }, []);

  const FinalOrder = () => {
    Setopen(true);
  };

  const closeHandler = () => {
    Setopen(false);

    setTimeout(() => {
      props.history.push("/thank-you");
    }, 1000);
  };

  let DataToDisplay =
    Object.keys(props.ing.ing).length != 0 ? (
      <Container maxWidth="lg" style={{ marginTop: "20px" }}>
        <div>
          <Grid container justify="center" alignItems="center">
            <Grid item lg={6} sm={6} xs={12}>
              <Paper className={classes.paper} elevation={3}>
                <Burger ing={props.ing} />
              </Paper>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={12} sm={12}>
            <Paper
              className={classes.paper}
              style={{ justifyContent: "center" }}
            >
              <h3>Total Cost : {props.ing.totalPrice} ₹</h3>
              <React.Fragment>
                {Object.keys(props.ing.ing).map((i, index) => {
                  return (
                    <h4 key={index}>
                      {i} x{props.ing.ing[i]}
                    </h4>
                  );
                })}
              </React.Fragment>
            </Paper>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ marginBottom: "10%" }}
            spacing={0}
          >
            {/* <BuildControls ing={ing} /> */}

            <Grid item xs={12} lg={12} sm={12}>
              <Paper
                className={classes.paper}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ height: "50%", top: "10px", marginBottom: "10%" }}
                  onClick={FinalOrder}
                >
                  Order
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    height: "50%",
                    top: "10px",
                    marginBottom: "10%",
                    marginLeft: "10px",
                  }}
                  onClick={() => {
                    props.history.goBack();
                  }}
                >
                  Cancel
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>

        <MyFullScreenDialog open={open} close={closeHandler} />
      </Container>
    ) : (
      <Redirect to="/"></Redirect>
    );

  return DataToDisplay;
}

const MapStateToProps = (state) => {
  return { ing: state.burger };
};

export default connect(MapStateToProps)(Checkout);
