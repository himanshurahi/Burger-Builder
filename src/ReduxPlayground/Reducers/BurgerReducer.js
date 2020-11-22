import { Redirect } from "react-router";
const initalState = {
  ing: {},
  totalPrice: 290,
  loading: true,
};

const ingPrice = {
  salad: 50,
  bacon: 100,
  cheese: 60,
  meat: 80,
};

const BurgerReducer = (state = initalState, action) => {
  if (action.type == "ADD_ING") {
    const copyIng = state.ing;
    const newCount = copyIng[action.ing_type] + 1;
    copyIng[action.ing_type] = newCount;
    let oldPrice = state.totalPrice;
    let newPrice = oldPrice + ingPrice[action.ing_type];
    return {
      ...state,
      ing: copyIng,
      totalPrice: newPrice,
    };
  }

  if (action.type == "REMOVE_ING") {
    return {
      ...state,
      ing: {
        ...state.ing,
        [action.ing_type]: state.ing[action.ing_type] - 1,
      },
      totalPrice: state.totalPrice - ingPrice[action.ing_type],
    };
  }

  if (action.type == "SET_ING") {
    return {
      ...state,
      ing: action.ing.ing,
      totalPrice: action.ing.totalPrice,
    };
  }

  if (action.type == "SET_LOADING") {
    return {
      ...state,
      loading: action.isLoading,
    };
  }

  if (action.type == "MAKE_ORDER") {
    return state;
  }

  return state;
};

export default BurgerReducer;
