import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Spinner() {
  const classes = useStyles();

  return (
    <div className={classes.root} style = {{margin : "10px", justifyContent : 'center'}}>
      <CircularProgress />
    </div>
  );
}
export default Spinner;
