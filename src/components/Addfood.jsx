import { useFormik } from "formik";
import * as Yup from "yup";
import { Foodcontext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Addfood() {
  const context = useContext(Foodcontext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      food: "",
      price: "",
      first: "",
      second: "",
      third: "",
    },
    validationSchema: Yup.object({
      food: Yup.string()
        .max(10, "Must be 10 characters or less")
        .min(3, "Too short")
        .required("Required"),
      price: Yup.number("Enter only number")
        .required("Required")
        .max(500, "Choose lower price"),
      first: Yup.string()
        .max(20, "Too long")
        .min(3, "Too short")
        .required("Required"),
      second: Yup.string()
        .max(20, "Too long")
        .min(3, "Too short")
        .required("Required"),
      third: Yup.string()
        .max(20, "Too long")
        .min(3, "Too short")
        .required("Required"),
    }),
    onSubmit: (values) => {
      addMyFood(values);
      navigate("/");
    },
  });

  async function addMyFood(values) {
    let tempData = context.foodData;
    let dataToAdd = {
      name: values.food,
      price: values.price,
      toppings: {
        first: values.first,
        second: values.second,
        third: values.third,
      }
    }
    tempData.push(dataToAdd);
    let response = await axios.post(
      "https://6199eedf9022ea0017a7af8a.mockapi.io/foods",
      dataToAdd
    );
    console.log(response.data)
    context.setFoodData(tempData);
  }

  return (
    <div className="row mainBody">
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 mainBanner ">
            <form onSubmit={formik.handleSubmit} className="inputs">
              <span>Add Food Item</span>
              <label HtmlFor="food">
                Enter Food Name :{" "}
                {formik.errors.food ? (
                  <small>{formik.errors.food}</small>
                ) : null}
              </label>
              <input
                type="text"
                id="food"
                name="food"
                value={formik.values.food}
                onChange={formik.handleChange}
              />

              <label HtmlFor="price">
                Enter price :{" "}
                {formik.errors.price ? (
                  <small>{formik.errors.price}</small>
                ) : null}
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />

              <label HtmlFor="first">
                Enter first topping :{" "}
                {formik.errors.first ? (
                  <small>{formik.errors.first}</small>
                ) : null}
              </label>
              <input
                type="text"
                id="first"
                name="first"
                value={formik.values.first}
                onChange={formik.handleChange}
              />

              <label HtmlFor="second">
                Enter second topping :{" "}
                {formik.errors.second ? (
                  <small>{formik.errors.second}</small>
                ) : null}
              </label>

              <input
                type="text"
                id="second"
                name="second"
                value={formik.values.second}
                onChange={formik.handleChange}
              />

              <label HtmlFor="third">
                Enter third topping :{" "}
                {formik.errors.third ? (
                  <small>{formik.errors.third}</small>
                ) : null}
              </label>

              <input
                type="text"
                id="third"
                name="third"
                value={formik.values.third}
                onChange={formik.handleChange}
              />

              <button
                className="btn submitBtn"
                type="submit"
                name="submit"
                id="submit"
              >
                Submit Food
              </button>
            </form>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
}

export default Addfood;
