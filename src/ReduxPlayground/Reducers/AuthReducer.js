const intialState = {
  userData: {},
  loading: false,
  snakbarOpen: false,
  snakbarOpenMsg: "",
};

const AuthReducer = (state = intialState, action) => {
  if (action.type == "SIGNUP") {
    return {
      ...state,
      userData: action.data.data,
    };
  }

  if (action.type == "SIGNUP_LOADING") {
    return {
      ...state,
      loading: action.loading,
    };
  }

  if (action.type == "SIGNUP_FAILED") {
    return {
      ...state,
      snakbarOpen: true,
      snakbarOpenMsg: action.msg,
    };
  }

  if (action.type == "CLOSE_SNACKBAR") {
    return {
      ...state,
      snakbarOpen: false,
    };
  }

  if (action.type == "LOGIN") {
    return {
      ...state,
      userData: {
        token: action.data.data.idToken,
        uid: action.data.data.localId,
        email: action.data.data.email,
      },
    };
  }

  if (action.type == "LOGIN_LOADING") {
    return {
      ...state,
      loading: action.loading,
    };
  }

  if (action.type == "LOGIN_FAILED") {
    return {
      ...state,
      snakbarOpen: true,
      snakbarOpenMsg: action.msg,
    };
  }

  if (action.type == "LOGOUT") {
    return {
      ...state,
      userData: {},
    };
  }

  if (action.type == "LOGOUT_WITH_SNACKBAR") {
    return {
      ...state,
      userData: {},
      snakbarOpen: true,
      snakbarOpenMsg: "Logout1",
    };
  }
  return state;
};

export default AuthReducer;
