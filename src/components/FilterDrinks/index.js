import React, { useContext, useEffect } from 'react';
import Context from '../../context/Context';

function FilterDrinks() {
  const {
    receivedCategoryDrinks,
    setReceivedCategoryDrinks,
    setReceivedDrinks,
    setSearchDrinksByCategory,
    searchDrinksByCategory,
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
    if (searchDrinksByCategory === false) {
      setSearchDrinksByCategory(true);
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(url);
      const data = await response.json();
      const { drinks } = data;
      setReceivedDrinks(drinks);
    }
    if (searchDrinksByCategory === true) {
      setSearchDrinksByCategory(false);
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const data = await response.json();
      const { drinks } = data;
      setReceivedDrinks(drinks);
    }
  };

  return (
    <div>
      <button type="button" data-testid="All-category-filter">All</button>
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
