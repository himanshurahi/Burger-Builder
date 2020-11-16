import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Spinner from "../spinner/spinner";

function MyDialog(props) {
  // shouldComponentUpdate(nextProps, nextState){
  //     console.log(nextProps.total.ing == this.props.total.ing)
  //     return true;
  // }
  const Memo = React.useMemo(() => {
    console.log(props);
    return (
      <div>
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={props.open}
          onClose={props.close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Order Total"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {Object.keys(props.total.ing).map((i, index) => {
                return (
                  <li key={index} style={{ textTransform: "capitalize" }}>
                    {i} : x{props.total.ing[i]}
                  </li>
                );
              })}
            </DialogContentText>
            <h3 style={{ textAlign: "center" }}>
              Total : {props.total.totalPrice} ₹
            </h3>
          </DialogContent>
          <DialogActions>
            {props.loading ? (
              <Spinner />
            ) : (
              <React.Fragment>
                <Button onClick={props.close} color="primary">
                  Cancel
                </Button>

                <Button onClick={props.makeorder} color="primary" autoFocus>
                  Proceed
                </Button>
              </React.Fragment>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }, [props.loading, props.open]);

  return <React.Fragment>{Memo}</React.Fragment>;
}

export default MyDialog;
