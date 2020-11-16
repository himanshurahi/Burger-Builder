import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import Container from "@material-ui/core/Container";
import Basic from "./formik/formik";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MyFullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);

  const onSubmit = (data) => {
    let finalData = { ...props.ing, ...data };
    
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.close}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.close}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Contact
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          {/* <form
            className={classes.root}
            noValidate
            autoComplete="off"
            style={{ marginTop: "20px", lineHeight: "75px" }}
          >
            <TextField
              id="name"
              label="Name"
              name="name"
              fullWidth
              onChange={changeHandler}
              helperText={Errors?.name}
              error={Errors?.name ? true : false}
              onBlur={onBlurHandler}
            />
            <TextField
              id="emai"
              label="Email"
              name="email"
              type="email"
              fullWidth
              onChange={changeHandler}
              helperText={Errors?.email}
              error={Errors?.email ? true : false}
              onBlur={onBlurHandler}
            />
            <TextField
              id="number"
              label="Phone number"
              type="number"
              name="number"
              fullWidth
              onChange={changeHandler}
              helperText={Errors?.number}
              error={Errors?.number ? true : false}
              onBlur={onBlurHandler}
            />
            <TextField
              id="address"
              label="Address"
              name="address"
              fullWidth
              onChange={changeHandler}
              helperText={Errors?.address}
              error={Errors?.address ? true : false}
              onBlur={onBlurHandler}
            />
          </form> */}
          <Basic data = {props.ing}  />
        </Container>
      </Dialog>
    </div>
  );
}

export default MyFullScreenDialog;
