import "./App.css";
import Navbar from "./components/Navbar";
import Allfood from "./components/Allfood";
import Addfood from "./components/Addfood";
import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

export const Foodcontext = createContext();
function App() {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    getApiData();
  }, []);

  async function getApiData() {
    let apiData = await axios.get(
      "https://6199eedf9022ea0017a7af8a.mockapi.io/foods"
    );
    setFoodData(apiData.data);
  }

  return (
    <div className="container-fluid">
      <Foodcontext.Provider value={{ foodData, setFoodData }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Allfood foodData={foodData} />} />
          <Route path="/addfood" element={<Addfood />} />
        </Routes>
      </Foodcontext.Provider>
    </div>
  );
}

export default App;
