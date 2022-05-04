import React, { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import './FilterDrinks.css';

function FilterDrinks() {
  const {
    receivedCategoryDrinks,
    setReceivedCategoryDrinks,
    setReceivedDrinks,
    setSearchDrinksByCategory,
    selectedFilter,
    setSelectedFilter,
  } = useContext(Context);
  const maxFilter = 5;

  useEffect(() => {
    const fetchRecipe = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(url);
      const data = await response.json();
      const { drinks } = data;
      setReceivedCategoryDrinks(drinks);
    };
    fetchRecipe();
  }, []);

  const filterButton = async (category) => {
    if (selectedFilter !== category) {
      setSelectedFilter(category);
      setSearchDrinksByCategory(true);
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(url);
      const data = await response.json();
      const { drinks } = data;
      setReceivedDrinks(drinks);
    }
    if (selectedFilter === category) {
      setSearchDrinksByCategory(false);
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const data = await response.json();
      const { drinks } = data;
      setReceivedDrinks(drinks);
      setSelectedFilter('');
    }
  };

  const buttonAll = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const data = await response.json();
    const { drinks } = data;
    setReceivedDrinks(drinks);
    setSelectedFilter('');
  };

  return (
    <div className="container">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => buttonAll() }
      >
        All
      </button>
      {receivedCategoryDrinks && receivedCategoryDrinks.map((category, index) => (
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

export default FilterDrinks;
