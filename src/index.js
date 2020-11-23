import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import countReducer from "./ReduxPlayground/Reducers/countReducer";
import resultReducer from "./ReduxPlayground/Reducers/resultReducer";
import BurgerReducer from "./ReduxPlayground/Reducers/BurgerReducer";
import OrderReducer from "./ReduxPlayground/Reducers/OrdersReducer";
import AuthReducer from "./ReduxPlayground/Reducers/AuthReducer";
import thunk from "redux-thunk";

// axios.defaults.headers.common['Authorization'] = 'Auth_token'

// axios.interceptors.request.use(request => {
//   console.log(request)
//   return request
// })

// axios.interceptors.response.use(resp => {
//   console.log(resp)
//   return resp
// }, error => {
//   console.log(error)
//   return error
// })

//===MIDDLEWARE==//
const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log("middleware", action);
      next(action);
    };
  };
};
const rootReducer = combineReducers({
  ctr: countReducer,
  result: resultReducer,
  burger: BurgerReducer,
  orders: OrderReducer,
  auth: AuthReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = null || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
