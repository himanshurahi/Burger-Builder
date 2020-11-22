const intialState = {
  orders: [],
  loading: true,
};

const OrderReducer = (state = intialState, action) => {
  if (action.type == "FETCH_ORDERS") {
    return {
      ...state,
      orders: action.data,
    };
  }
  if (action.type == "SET_LOADING_ORDERS") {
    return {
      ...state,
      loading: action.isLoading,
    };
  }
  return state;
};

export default OrderReducer;
