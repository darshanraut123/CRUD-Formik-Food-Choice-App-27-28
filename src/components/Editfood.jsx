import { useFormik } from "formik";
import * as Yup from "yup";
import { Foodcontext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

//Component for editing the food 
function Editfood() {
  const params = useParams();
  const context = useContext(Foodcontext);
  const navigate = useNavigate();
  const [myData, setMyData] = useState();

  useEffect(() => {
    getData();
  }, []);

  //Gets the data and updates the state
  async function getData() {
    let apiData = await axios.get(
      "https://6199eedf9022ea0017a7af8a.mockapi.io/foods"
    );
    let obj = await apiData.data.filter((res) => res.id === params.id);
    obj = obj[0];
    let temp = {
      name: obj.name,
      price: obj.price,
      first: obj.toppings.first,
      second: obj.toppings.second,
      third: obj.toppings.third,
    };
    setMyData(temp);
  }

  //Saves the updated food data
  async function editSaveFood(values) {
    let temp = {
      name: values.name,
      price: values.price,
      toppings: {
        first: values.first,
        second: values.second,
        third: values.third,
      },
    };
    let position= null;
    for(let i in context.foodData){
      if(context.foodData[i].id===params.id)
        position=i;
    }
    context.foodData[position] = temp;
    let apiData = await axios.put(
      "https://6199eedf9022ea0017a7af8a.mockapi.io/foods/" + params.id,
      temp
    );
    console.log(position)
  }

  const defaultData = {
    name: "",
    price: "",
    first: "",
    second: "",
    third: "",
  };

  //Formik object for form data validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: myData || defaultData,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .max(7, "Must be 15 characters or less")
        .required("Required!"),
      price: Yup.number()
        .max(1000, "Price should be less than 1000")
        .min(1, "Price should be more than 1")
        .required("Required!"),
      first: Yup.string().required("Required!"),
      second: Yup.string().required("Required!"),
      third: Yup.string().required("Required!"),
    }),
    onSubmit: (values) => {
      editSaveFood(values);
      navigate("/");
    },
  });

  return (
    <div className="row mainBody">
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 mainBanner ">
            <form onSubmit={formik.handleSubmit} className="inputs">
              <span>Edit Food Item</span>

              <label htmlFor="name">
                Enter Food Name :{" "}
                {formik.errors.name && formik.touched.name ? (
                  <small>{formik.errors.name}</small>
                ) : null}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
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
                value={formik.values.price}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />

              <label htmlFor="first">
                Enter first topping :{" "}
                {formik.errors.first && formik.touched.first ? (
                  <small>{formik.errors.first}</small>
                ) : null}
              </label>
              <input
                type="text"
                id="first"
                name="first"
                value={formik.values.first}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />

              <label htmlFor="second">
                Enter second topping :{" "}
                {formik.errors.second && formik.touched.second ? (
                  <small>{formik.errors.second}</small>
                ) : null}
              </label>

              <input
                type="text"
                id="second"
                name="second"
                value={formik.values.second}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />

              <label htmlFor="third">
                Enter third topping :{" "}
                {formik.errors.third && formik.touched.third ? (
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

export default Editfood;
