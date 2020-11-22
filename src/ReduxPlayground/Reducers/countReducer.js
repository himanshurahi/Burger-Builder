const intialState = {
  counter: 0,
  results: [],
};

const countReducer = (state = intialState, action) => {
  if (action.type == "INC") {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }
  if (action.type == "ADD") {
    return {
      ...state,
      counter: state.counter + action.value,
    };
  }

  if (action.type == "STORE") {
    let arr = state.results.slice();
    arr.push(state.counter);
    return {
      ...state,
      results: arr,
    };
  }

  if (action.type == "DELETE") {
    // let newArray = [...state.results];
    // newArray.splice(action.index, 1);
    // console.log(newArray);

    let newArray = state.results.filter((el, index) => {
      return index != action.index;
    });

    return {
      ...state,
      results: newArray,
    };
  }

  return state;
};

export default countReducer;
