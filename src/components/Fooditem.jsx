import React ,{useContext} from "react";
import {useNavigate} from 'react-router-dom';
import { Foodcontext } from "../App";
 const myStyle = { fontSize: "15px", fontWeight: 700, color: "black", textTransform:"uppercase"};

function Fooditem(props) {
  const context  = useContext(Foodcontext);

  let editFood = (id)=>{
    navigate("/editFood/"+id);
    }
  

  let deletehandler = (id)=>{
    context.deleteFood(id);
  }

  const navigate = useNavigate();

  return (
    <div className="item">
      <div  className="editDelete">
      <div onClick={()=>{deletehandler(props.food.id)}} style={myStyle}>delete</div>
      <div onClick={()=>{editFood(props.food.id)}} style={myStyle}>Edit</div>
      </div>
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
