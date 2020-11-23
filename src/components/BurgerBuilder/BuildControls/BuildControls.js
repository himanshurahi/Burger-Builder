import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addIng, removeIng } from "../../../ReduxPlayground/Actions/actions_creator";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function BuildControls(props) {
  let t = Object.keys(props.ing.ing)
    .map((i) => {
      return props.ing.ing[i];
    })
    .reduce((total, el) => {
      return total + el;
    });

  const [controls, Setcontrols] = React.useState([
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Meat", type: "meat" },
    { label: "Chesse", type: "cheese" },
  ]);
  const classes = useStyles();
  //   const TestFunc = (type) => {
  //     props.addIng(type);
  //   };

  return controls.map((i, index) => {
    return (
      <Grid item xs={12} lg={12} sm={12} key={index}>
        <Paper
          className={classes.paper}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <h4>{i.label} : </h4>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            color="primary"
            style={{ height: "50%", top: "10px" }}
            onClick={() => props.addIng(i.type)}
            disabled={t === 10}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ height: "50%", top: "10px", marginLeft: "5px" }}
            onClick={() => {
              props.removeIng(i.type);
            }}
            disabled={props.ing.ing[i.type] === 0}
          >
            Remove
          </Button>
        </Paper>
      </Grid>
    );
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIng: (type) => dispatch(addIng(type)),
    removeIng: (type) => dispatch(removeIng(type)),
  };
};

export default connect(null, mapDispatchToProps)(BuildControls);
