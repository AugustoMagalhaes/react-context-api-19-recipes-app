import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import { getFoodsNationalities } from '../../services/fetchFoods';
import Context from '../../context/Context';
import FoodCards from '../../components/FoodCards';
import FilterFoods from '../../components/FilterFoods/index';
import './ExploreNationalities.css';

function ExploreNationalitiesScreen() {
  const [nationalities, setNationalities] = useState([]);
  const [selectedNat, setSelectedNat] = useState([]);

  const { setReceivedFoods } = useContext(Context);
  useEffect(() => {
    const fetchApi = async () => {
      const results = await getFoodsNationalities();
      setNationalities(results);
    };
    const fetchRecipe = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const data = await response.json();
      const { meals } = data;
      setReceivedFoods(meals);
    };
    fetchRecipe();
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchRecipeNat = async () => {
      if (selectedNat.length > 0 && selectedNat !== 'All') {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedNat}`;
        const response = await fetch(url);
        const data = await response.json();
        const { meals } = data;
        setReceivedFoods(meals);
      }
      if (selectedNat.length > 0 && selectedNat === 'All') {
        const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(url);
        const data = await response.json();
        const { meals } = data;
        setReceivedFoods(meals);
      }
    };
    fetchRecipeNat();
  }, [selectedNat]);

  const pageTitle = 'Explore Nationalities';
  const hasSearch = true;
  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ hasSearch } />
      <section className="containerNat">
        <select
          data-testid="explore-by-nationality-dropdown"
          onChange={ (e) => setSelectedNat(e.target.value) }
        >
          <option
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          {nationalities.map((nationality) => (
            <option
              key={ uuidv4() }
              data-testid={ `${nationality.strArea}-option` }
              value={ nationality.strArea }
            >
              {nationality.strArea}
            </option>
          ))}
        </select>
        <FilterFoods />
      </section>
      <FoodCards />
      <Footer />
    </div>
  );
}

export default ExploreNationalitiesScreen;
