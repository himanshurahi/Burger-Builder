import "./App.css";
import Layout from "./components/Layout/Layout";
import BurgerBulder from "./components/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import React from "react";
import Checkout from "./components/BurgerBuilder/checkout/checkout";
import Thankyou from "./components/BurgerBuilder/Thankyou/Thankyou";
import Myorders from "./components/BurgerBuilder/Myorders/Myorders";

function App() {
  const [auth, setauth] = React.useState(false);
  return (
    <BrowserRouter>
      <div>
        <Layout />

        <Route path="/" exact component={BurgerBulder} />
        <Route path="/login" exact render={() => <h1>Login</h1>} />
        <Route path="/thank-you" exact component = {Thankyou} />
        <Route path="/orders" exact component = {Myorders} />
        <Route path="/checkout" exact component={Checkout}></Route>
        <Route path="/burger/:id" exact component={BurgerBulder}></Route>
        <Route path="/post/:id" exact component={BurgerBulder}></Route>
        {/* <Redirect from="/" to="/login"></Redirect> */}
        {/* <BurgerBulder /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
