import "./App.css";
import Layout from "./components/Layout/Layout";
import BurgerBulder from "./components/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import React from "react";
import Checkout from "./components/BurgerBuilder/checkout/checkout";
import Thankyou from "./components/BurgerBuilder/Thankyou/Thankyou";
import Myorders from "./components/BurgerBuilder/Myorders/Myorders";
import Auth from "./components/Auth/Login/Login";
import { connect } from "react-redux";
import { checkAuthState } from "./ReduxPlayground/Actions/actions_creator";

function App(props) {
  React.useEffect(() => {
    props.checkAuthState();
  }, [props]);

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBulder} />
      <Route path="/auth" exact component={Auth}></Route>
      <Redirect to="/"></Redirect>
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBulder} />
        <Route path="/orders" exact component={Myorders} />
        <Route path="/thank-you" exact component={Thankyou} />
        <Route path="/checkout" exact component={Checkout}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <Layout />
        {routes}
        {/* <Route path="/burger/:id" exact component={BurgerBulder}></Route>
        <Route path="/post/:id" exact component={BurgerBulder}></Route>
        <Route path="/counter" exact component={Counter}></Route> */}

        {/* <Redirect from="/" to="/login"></Redirect> */}
        {/* <BurgerBulder /> */}
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: Object.keys(state.auth.userData) != 0,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    checkAuthState: () => dispatch(checkAuthState()),
  };
};

export default connect(mapStateToProps, MapDispatchToProps)(App);
