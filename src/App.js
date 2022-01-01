import "./App.css";
import Navbar from "./components/Navbar";
import Allfood from "./components/Allfood";
import Addfood from "./components/Addfood";
import Editfood from "./components/Editfood";
import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

export const Foodcontext = createContext();
function App() {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    getApiData();
  }, [foodData]);

  //Gets the data from API and loads in all food component
  async function getApiData() {
    let apiData = await axios.get(
      "https://6199eedf9022ea0017a7af8a.mockapi.io/foods"
    );
    setFoodData(apiData.data);
  }

  //A funtion which deleted food when ID is passed 
  async function deleteFood(id){
    setFoodData(foodData.filter((res)=>res.id!==id));
    let apiData = await axios.delete("https://6199eedf9022ea0017a7af8a.mockapi.io/foods/"+id);
  }

  //App component which has routes for add , all & edit food components
  return (
    <div className="container-fluid">
      <Foodcontext.Provider value={{ foodData, setFoodData , deleteFood }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Allfood foodData={foodData} />} />
          <Route path="/addfood" element={<Addfood />} />
          <Route path="/editFood/:id" element={<Editfood />} />
        </Routes>
      </Foodcontext.Provider>
    </div>
  );
}

export default App;
