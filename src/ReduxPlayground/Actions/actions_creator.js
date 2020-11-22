import axios from "axios";
export const addIng = (value) => {
  return function (dispatch) {
    dispatch({
      type: "ADD_ING",
      ing_type: value,
    });
  };
};

export const removeIng = (value) => {
  return function (dispatch) {
    dispatch({
      type: "REMOVE_ING",
      ing_type: value,
    });
  };
};

export const increment = () => {
  return function (dispatch, getState) {
    // console.log(getState());
    dispatch({ type: "INC" });
  };
};

export const fetchIng = () => {
  return function (dispatch) {
    dispatch({ type: "SET_LOADING", isLoading: true });
    axios
      .get(process.env.REACT_APP_ING_API)
      .then((data) => {
        dispatch({ type: "SET_ING", ing: data.data });
        dispatch({ type: "SET_LOADING", isLoading: false });
      })
      .catch((error) => {
        dispatch({ type: "FAILED" });
      });
  };
};

export const makeOrder = (FinalData, ownProps) => {
  delete FinalData.loading;
  return function (dispatch, state) {
    dispatch({ type: "SET_LOADING", isLoading: true });
    axios.post(process.env.REACT_APP_ORDERS_API, FinalData).then((data) => {
      dispatch({ type: "SET_LOADING", isLoading: false });
      dispatch({ type: "MAKE_ORDER", FinalData: data });
      ownProps.history.push({
        pathname: "/thank-you",
        state: { orderId: data.data.name, totalPrice: FinalData.totalPrice },
      });
    });
  };
};

export const FetchOrders = (userId) => {
  let fetchedArray = [];
  return function (dispatch) {
    dispatch({ type: "SET_LOADING_ORDERS", isLoading: true });
    axios.get(process.env.REACT_APP_ORDERS_API).then((data) => {
      for (let key in data.data) {
        fetchedArray.push({ id: key, ...data.data[key] });
      }

      let finalArray = fetchedArray.filter((el) => {
        return el.uid == userId;
      });

      dispatch({ type: "FETCH_ORDERS", data: finalArray });
      dispatch({ type: "SET_LOADING_ORDERS", isLoading: false });
    });
  };
};

export const Signup = (values) => {
  let postData = {
    email: values.email,
    password: values.password,
    returnSecureToken: true,
  };

  return function (dispatch) {
    dispatch({ type: "SIGNUP_LOADING", loading: true });
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          process.env.REACT_APP_API_KEY,
        postData
      )
      .then((res) => {
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("uid", res.data.localId);
        dispatch({ type: "SIGNUP", data: res });
        dispatch({ type: "SIGNUP_LOADING", loading: false });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_LOADING", loading: false });
        dispatch({
          type: "SIGNUP_FAILED",
          msg: err.response.data.error.message,
        });
      });
  };
};

export const login = (values, ownProps) => {
  const postData = {
    email: values.email,
    password: values.password,
    returnSecureToken: true,
  };
  return function (dispatch) {
    dispatch({ type: "LOGIN_LOADING", loading: true });
    axios
      .post(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
          process.env.REACT_APP_API_KEY,
        postData
      )
      .then((res) => {
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("uid", res.data.localId);
        dispatch({ type: "LOGIN", data: res });
        dispatch({ type: "LOGIN_LOADING", loading: false });
        // ownProps.history.push("/orders");
      })
      .catch((errors) => {
        dispatch({ type: "LOGIN_LOADING", loading: false });
        dispatch({
          type: "LOGIN_FAILED",
          msg: errors.response.data.error.message,
        });
      });
  };
};

export const logout = (ownProps) => {
  return function (dispatch) {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    ownProps.history.push("/");
  };
};

export const checkAuthState = (ownProps) => {
  let token = localStorage.getItem("token");
  return function (dispatch) {
    if (!token) {
      dispatch({ type: "LOGOUT" });
    } else {
      dispatch({
        type: "LOGIN",
        data: {
          data: {
            idToken: localStorage.getItem("token"),
            localId: localStorage.getItem("uid"),
            email: localStorage.getItem("email"),
          },
        },
      });
    }
  };
};
