import { useFormik } from "formik";
import * as Yup from "yup";
import { Foodcontext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Component for new food addition
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
    },
  });

  //Function which adds food data to api
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
    //Pushing the data at the end of array
    tempData.push(dataToAdd);
    let response = await axios.post(
      "https://6199eedf9022ea0017a7af8a.mockapi.io/foods",
      dataToAdd
    );
    if(response.status===201){
      context.setFoodData(tempData);
      setTimeout(() => navigate("/"), 1000);
      
    }
  }
  return (
    <div className="row mainBody">
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 mainBanner ">
            <form onSubmit={formik.handleSubmit} className="inputs">
              <span>Add Food Item</span>
              <label htmlFor="food">
                Enter Food Name :{" "}
                {formik.errors.food  && formik.touched.food? (
                  <small>{formik.errors.food}</small>
                ) : null}
              </label>
              <input
                type="text"
                id="food"
                name="food"
                value={formik.values.food}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />

              <label htmlFor="price">
                Enter price :{" "}
                {formik.errors.price && formik.touched.price ? (
                  <small>{formik.errors.price}</small>
                ) : null}
              </label>
              <input
                type="text"
                id="price"
                name="price"
                onBlur={formik.handleBlur}
                value={formik.values.price}
                onChange={formik.handleChange}
              />

              <label htmlFor="first">
                Enter first topping :{" "}
                {formik.errors.first  && formik.touched.first ? (
                  <small>{formik.errors.first}</small>
                ) : null}
              </label>
              <input
                type="text"
                id="first"
                name="first"
                onBlur={formik.handleBlur}
                value={formik.values.first}
                onChange={formik.handleChange}
              />

              <label htmlFor="second">
                Enter second topping :{" "}
                {formik.errors.second  && formik.touched.second? (
                  <small>{formik.errors.second}</small>
                ) : null}
              </label>

              <input
                type="text"
                id="second"
                name="second"
                onBlur={formik.handleBlur}
                value={formik.values.second}
                onChange={formik.handleChange}
              />

              <label htmlFor="third">
                Enter third topping :{" "}
                {formik.errors.third  && formik.touched.third? (
                  <small>{formik.errors.third}</small>
                ) : null}
              </label>

              <input
                type="text"
                id="third"
                name="third"
                value={formik.values.third}
                onBlur={formik.handleBlur}
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
