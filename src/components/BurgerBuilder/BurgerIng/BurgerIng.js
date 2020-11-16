import React from "react";
import "./BurgerIng.css";

function BurgerIng(props) {
  let ing = null;
  switch (props.type) {
    case "bread-bottom":
      ing = <div className="BreadBottom"></div>;
      break;
    case "bread-top":
      ing = (
        <div className="BreadTop">
          <div className="Seeds1"></div>
          <div className="Seeds2"></div>
        </div>
      );
      break;
    case "meat":
      ing = <div className="Meat"></div>;
      break;
    case "cheese":
      ing = <div className="Cheese"></div>;
      break;
    case "bacon":
      ing = <div className="Bacon"></div>;
      break;
    case "salad":
      ing = <div className="Salad"></div>;
      break;
    default:
      ing = null;
  }

  return ing;
}

export default BurgerIng;
