import React, { useState } from "react";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Burger from "../Burger/Burger";
import { Route } from "react-router-dom";
import ContactData from "../ContactData/ContactData";
import MyFullScreenDialog from "../FullScreenDialog/FullScreenDialog";

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
  const classes = useStyles();

  const [ing, setIng] = useState({
    ing: {
      salad: 1,
      cheese: 1,
      bacon: 1,
      meat: 1,
    },
    totalPrice: 290,
  });

  const [open, Setopen] = useState(false);

  React.useEffect(() => {
    if (!props.location.state) {
      props.history.push({
        pathname: "/",
        hash: "PleasePlaceOrderFirst",
      });
    }

    let ing = props.location.state;
    setIng(ing);
  }, [props.location.state]);

  const FinalOrder = () => {
    console.log("final Order");
    Setopen(true);
  };

  const closeHandler = () => {
    Setopen(false);

    setTimeout(() => {
      props.history.push("/thank-you");
    }, 1000);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <div>
        <Grid container justify="center" alignItems="center">
          <Grid item lg={6} sm={6} xs={12}>
            <Paper className={classes.paper} elevation={3}>
              <Burger ing={ing} />
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={12} sm={12}>
          <Paper className={classes.paper} style={{ justifyContent: "center" }}>
            <h3>Total Cost : {ing.totalPrice} ₹</h3>
            <React.Fragment>
              {Object.keys(ing.ing).map((i, index) => {
                return (
                  <h4 key={index}>
                    {i} x{ing.ing[i]}
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

      <MyFullScreenDialog open={open} close={closeHandler} ing = {ing} />
    </Container>
  );
}

export default Checkout;
