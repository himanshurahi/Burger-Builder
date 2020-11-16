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
import CheckIcon from "@material-ui/icons/Check";

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

function Thankyou(props) {
  const classes = useStyles();

  const [open, Setopen] = useState(false);

  React.useEffect(() => {
    console.log("thankyou");
  }, []);

  const FinalOrder = () => {
    console.log("final Order");
    Setopen(true);
  };

  const closeHandler = () => {
    Setopen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <div>
        <Grid container justify="center" alignItems="center">
          <Grid item lg={6} sm={6} xs={12}>
            <Paper className={classes.paper} elevation={3}>
              <h2>Order Place Successfully !!</h2>
              <CheckIcon
                style={{ height: "200px", width: "200px" }}
              ></CheckIcon>

              <h3>Total Cost : {props.location.state.totalPrice} ₹</h3>
            </Paper>
          </Grid>
        </Grid>
      </div>

      <MyFullScreenDialog open={open} close={closeHandler} />
    </Container>
  );
}

export default Thankyou;
