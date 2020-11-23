import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";

function SimpleSnackbar(props) {
  //   React.useEffect(() => {
  //     console.log(props)
  //   }, [props])
  //   CLOSE_SNACKBAR

  return (
    <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={props.open}
        autoHideDuration={6000}
        onClose={props.close}
        message={props.msg}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={props.close}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

const MapStateToProps = (state) => {
  return {
    open: state.auth.snakbarOpen,
    msg: state.auth.snakbarOpenMsg,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch({ type: "CLOSE_SNACKBAR" }),
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(SimpleSnackbar);
