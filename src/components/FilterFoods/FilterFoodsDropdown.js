import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';
import './FilterFoods.css';

function FilterFoodsDropdown() {
  const {
    receivedCategoryFoods,
    setReceivedCategoryFoods,
    setReceivedFoods,
  } = useContext(Context);
  const [selectedCategory, setSelectedCategory] = useState('');
  const maxFilter = 5;

  useEffect(() => {
    const fetchRecipe = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(url);
      const data = await response.json();
      const { meals } = data;
      setReceivedCategoryFoods(meals);
    };
    fetchRecipe();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      if (selectedCategory.length > 0 && selectedCategory === 'All') {
        const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(url);
        const data = await response.json();
        const { meals } = data;
        setReceivedFoods(meals);
        // setSelectedFilter('');
      }
      if (selectedCategory.length > 0 && selectedCategory !== 'All') {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
        const response = await fetch(url);
        const data = await response.json();
        const { meals } = data;
        setReceivedFoods(meals);
      }
    };
    fetchApi();
  }, [selectedCategory]);

  return (
    <div>
      <select
        value={ selectedCategory }
        onChange={ (e) => setSelectedCategory(e.target.value) }
      >
        <option
          value="All"
          data-testid="All-option"
        >
          All
        </option>
        {receivedCategoryFoods && receivedCategoryFoods.map((category, index) => (
          index < maxFilter
          && (
            <option
              value={ category.strCategory }
              key={ category.strCategory }
            >
              { category.strCategory }
            </option>
          )))}
      </select>
    </div>
  );
}

export default FilterFoodsDropdown;
