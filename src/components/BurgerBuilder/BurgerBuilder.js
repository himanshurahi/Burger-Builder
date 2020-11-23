import React from "react";
import Burger from "./Burger/Burger";

import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BuildControls from "./BuildControls/BuildControls";
import Button from "@material-ui/core/Button";

import MyDialog from "./Dialog/Dialog";
import axios from "axios";
import Spinner from "./spinner/spinner";
import { Link, Redirect } from "react-router-dom";
import Checkout from "./checkout/checkout";

import { connect } from "react-redux";
import { fetchIng } from "../../ReduxPlayground/Actions/actions_creator";
import SimpleSnackbar from "../Auth/Snackbar/Snackbar";
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

const style = {
  border: "1px solid black",
};

function BurgerBulder(props) {
  const [ing, setIng] = React.useState(null);

  //   const [ingPrice, setIngPrice] = React.useState({
  //     ing: {
  //       salad: 50,
  //       bacon: 100,
  //       cheese: 60,
  //       meat: 80,
  //     },
  //   });

  const [dialog, Setdialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [firstLoading, setFirstLoading] = React.useState(false);

  React.useEffect(() => {
    //fetching data
    // console.log(props.match.params.id)
    // fetchData();
    props.fetchIng();
  }, []);

  //   React.useEffect(() => {
  //     //fetching data
  //     console.log(props.match.params.id);

  //     let post = posts.find((el) => el.id == props.match.params.id);
  //     setselectedPost(post);
  //   }, [props.match.params.id]);

  const fetchData = () => {
    axios
      .get("https://burger-builder-374c1.firebaseio.com/ing.json")
      .then((data) => {
        setIng(data.data);
        setFirstLoading(false);
      });
  };

  //   const addIng = (type) => {
  //     const oldCount = ing.ing[type];
  //     const updatedcount = oldCount + 1;

  //     const CopyIng = { ...ing };
  //     CopyIng.ing[type] = updatedcount;
  //     //Price
  //     CopyIng.totalPrice = CopyIng.totalPrice + ingPrice.ing[type];
  //     setIng(CopyIng);
  //   };

  //   const removeIng = (type) => {
  //     const oldCount = ing.ing[type];
  //     const updatedcount = oldCount - 1;

  //     const CopyIng = { ...ing };
  //     CopyIng.ing[type] = updatedcount;
  //     CopyIng.totalPrice = CopyIng.totalPrice - ingPrice.ing[type];
  //     setIng(CopyIng);
  //   };

  const MakeOrder = () => {
    // setLoading(true);
    // const order = {
    //   ing: ing.ing,
    //   totalPrice: ing.totalPrice,
    // };
    props.history.push({
      pathname: "/checkout",
      //   state: ing,
    });

    // <Redirect to = {{pathname : '/checkout'}} ></Redirect>

    // axios
    //   .post("https://burger-builder-374c1.firebaseio.com/orders.json", order)
    //   .then((resp) => {
    //     setLoading(false);
    //     fetchData();
    //     Setdialog(false);

    //     console.log(resp);
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //   });
  };

  const classes = useStyles();

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      
      {props.ing.loading ? (
        <Spinner />
      ) : (
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
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h3>Total Cost : {props.ing.totalPrice} ₹</h3>
            </Paper>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ marginBottom: "10%" }}
            spacing={0}
          >
            <BuildControls
              //   addIng={addIng}
              //   removeIng={removeIng}
              ing={props.ing}
            />

            <Grid item xs={12} lg={12} sm={12}>
              <Paper
                className={classes.paper}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ height: "50%", top: "10px", marginBottom: "10%" }}
                  disabled={props.ing.totalPrice === 0}
                  onClick={() => Setdialog(true)}
                >
                  Checkout
                </Button>
              </Paper>
            </Grid>
          </Grid>
          <MyDialog
            open={dialog}
            total={props.ing}
            close={() => Setdialog(false)}
            makeorder={MakeOrder}
            loading={loading}
          />
        </div>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { ing: state.burger };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIng: () => dispatch(fetchIng()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBulder);
