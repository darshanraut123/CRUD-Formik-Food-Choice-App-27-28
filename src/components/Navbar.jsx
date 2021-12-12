import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="row navbar">
      <div className="col-md-4">
        {" "}
        <button className="btn btn-danger" onClick={() => navigate("/")}>
         Home
        </button>
      </div>
      <div className="col-md-7 title">Online Food Store</div>
      <div className="col-md-1">
        <button className="btn btn-success" onClick={() => navigate("/addfood")}>
          Add Food
        </button>
      </div>
    </div>
  );
}

export default Navbar;
