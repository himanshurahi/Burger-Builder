import React from "react";
import BurgerIng from "../BurgerIng/BurgerIng";
import "./Burger.css";

function Burger(props) {
  let tmpArray = [];
  let transIng = Object.keys(props.ing.ing);
  transIng.map((igKey) => {
    for (let index = 0; index < props.ing.ing[igKey]; index++) {
      //   console.log(props.ing.ing[igKey])

      //   tmpArray[igKey] = props.ing.ing[igKey]
      tmpArray.push(igKey);
    }
  });

  //   console.log(tmpArray);
  return (
    <div className="Burger">
      <BurgerIng type="bread-top" />

      {tmpArray.length == 0
        ? "Please Add"
        : tmpArray.map((i, index) => {
            return (
              <React.Fragment key={index}>
                <BurgerIng type={i} />
              </React.Fragment>
            );
          })}

      <BurgerIng type="bread-bottom" />
    </div>
  );
}

export default Burger;
