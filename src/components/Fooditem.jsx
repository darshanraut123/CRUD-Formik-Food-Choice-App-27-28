import React from "react";   

function Fooditem(props) {
  console.log(props);
    return (
    <div className="item">
      <div className="bannerTitle">
        <div className="foodName">{props.food.name}</div>
        <div className="foodPrice">
          {props.food.price}
          <span>₹</span>
        </div>
      </div>
      <div className="bannerData">
        <ul>
          <li>{props.food.toppings.first}</li>
          <li>{props.food.toppings.second}</li>
          <li>{props.food.toppings.third}</li>
        </ul>
      </div>
    </div>
  );
}

export default Fooditem;
