import React, { useContext, useEffect } from 'react';
import Context from '../../context/Context';

function FilterFoods() {
  const {
    receivedCategoryFoods,
    setReceivedCategoryFoods,
    setReceivedFoods,
    setSearchFoodsByCategory,
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
  }, []);

  const filterButton = async (category) => {
    setSearchFoodsByCategory(true);
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(url);
    const data = await response.json();
    const { meals } = data;
    setReceivedFoods(meals);
  };

  return (
    <div>
      <button type="button" data-testid="All-category-filter">All</button>
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
