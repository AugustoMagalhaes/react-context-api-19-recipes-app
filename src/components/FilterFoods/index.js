import React, { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import './FilterFoods.css';

function FilterFoods() {
  const {
    receivedCategoryFoods,
    setReceivedCategoryFoods,
    setReceivedFoods,
    setSearchFoodsByCategory,
    selectedFilter,
    setSelectedFilter,
  } = useContext(Context);
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
  }, [setReceivedCategoryFoods]);

  const filterButton = async (category) => {
    if (selectedFilter !== category) {
      setSelectedFilter(category);
      setSearchFoodsByCategory(true);
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(url);
      const data = await response.json();
      const { meals } = data;
      setReceivedFoods(meals);
    }
    if (selectedFilter === category) {
      setSearchFoodsByCategory(false);
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const data = await response.json();
      const { meals } = data;
      setReceivedFoods(meals);
      setSelectedFilter('');
    }
  };

  const buttonAll = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const data = await response.json();
    const { meals } = data;
    setReceivedFoods(meals);
    setSelectedFilter('');
  };

  return (
    <div className="container">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ buttonAll }
      >
        All
      </button>
      {receivedCategoryFoods && receivedCategoryFoods.map((category, index) => (
        index < maxFilter
        && (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            key={ category.strCategory }
            onClick={ () => filterButton(category.strCategory) }
          >
            {category.strCategory}
          </button>
        )

      ))}
    </div>
  );
}

export default FilterFoods;
