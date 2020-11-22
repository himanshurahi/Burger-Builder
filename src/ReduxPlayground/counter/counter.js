import React from "react";
import { connect } from "react-redux";
import { increment } from "../Actions/actions_creator";

function Counter(props) {
  console.log(props);
  const [counter, Setcounter] = React.useState(0);

  const incCounter = () => {
    Setcounter(counter + 1);
  };

  const addCount = () => {
    Setcounter(counter + 5);
  };

  return (
    <div>
      <h4>{props.ctr}</h4>
      <button onClick={props.increamentCounter}>Increase</button>
      <button onClick={() => props.addCounter(5)}>Add 5</button>
      <hr></hr>
      <button onClick={() => props.storeResult(props.ctr)}>Store Result</button>
      <ul>
        {props.storedResult.map((i, index) => {
          return (
            <li onClick={() => props.deleteResult(index)} key={index}>
              {i}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ctr: state.ctr.counter, storedResult: state.result.results };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increamentCounter: () => dispatch(increment()),
    addCounter: (val) => dispatch({ type: "ADD", value: val }),
    storeResult: (res) => dispatch({ type: "STORE", result: res }),
    deleteResult: (index) => dispatch({ type: "DELETE", index: index }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
