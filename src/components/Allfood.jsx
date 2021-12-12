import React from 'react';
import Fooditem from './Fooditem';
import {useContext} from 'react';
import {Foodcontext} from '../App';


function Allfood() {
  const context = useContext(Foodcontext);

  return (
    <div className="row mainBody">
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 mainBanner">
            {context.foodData.map((food) => (
              <Fooditem key={food.id} food={food} />
            ))}
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
}

export default Allfood;
