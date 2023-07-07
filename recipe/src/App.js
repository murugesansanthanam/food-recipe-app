import React, { useState } from "react";
import RecipeTile from "./RecipeTile";
import Axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [healthLabels, setHealthLabels] = useState("vegan");

  const YOUR_APP_ID = "3e2c320b";
  const YOUR_APP_KEY = "3795931bf974a1385d83c0f1e90d826b";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabels}`;

  async function getRecipes() {
    try {
      const result = await Axios.get(url);
      setRecipes(result.data.hits);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };

  return (
    <div className="app">
      <h1>Food Recipe Plaza</h1>
      <form className="app__searchForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="app__input"
          placeholder="enter ingredient"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />
        <select
          className="app_healthLabels"
          onChange={(e) => setHealthLabels(e.target.value)}
        >
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="dairy-free">Dairy-Free</option>
          <option value="gluten-free">Gluten-Free</option>
          <option value="wheat-free">Wheat-Free</option>
          <option value="low-sugar">Low-Sugar</option>
          <option value="egg-free">Egg-Free</option>
          <option value="peanut-free">Peanut-Free</option>
          <option value="tree-nut-free">Tree-Nut-Free</option>
          <option value="fish-free">Fish-Free</option>
          <option value="shellfish-free">Shellfish-Free</option>
        </select>
      </form>
      <div className="app__recipes">
        {recipes.map((recipe) => (
          <RecipeTile key={recipe.recipe.uri} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default App;
