import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../../context/Context';
import './FilterFoods.css';
import FilterFoodsButtons from './FilterFoodsButtons';
import FilterFoodsDropdown from './FilterFoodsDropdown';

function FilterFoods() {
  const {
    setReceivedCategoryFoods,
  } = useContext(Context);
  const location = useLocation();
  const { pathname } = location;

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

  return (
    pathname.includes('explore/foods/nationalities')
      ? <FilterFoodsDropdown /> : <FilterFoodsButtons />
  );
}

export default FilterFoods;
