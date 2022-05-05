import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../../context/Context';
import './FilterFoods.css';
import FilterFoodsButtons from './FilterFoodsButtons';
import FilterFoodsDropdown from './FilterFoodsDropdown';

function FilterFoods() {
  const {
    // receivedCategoryFoods,
    setReceivedCategoryFoods,
    // setReceivedFoods,
    // setSearchFoodsByCategory,
    // selectedFilter,
    // setSelectedFilter,
  } = useContext(Context);
  const location = useLocation();
  const { pathname } = location;
  // const maxFilter = 5;

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

  // const filterButton = async (category) => {
  //   if (selectedFilter !== category) {
  //     setSelectedFilter(category);
  //     setSearchFoodsByCategory(true);
  //     const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     const { meals } = data;
  //     setReceivedFoods(meals);
  //   }
  //   if (selectedFilter === category) {
  //     setSearchFoodsByCategory(false);
  //     const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     const { meals } = data;
  //     setReceivedFoods(meals);
  //     setSelectedFilter('');
  //   }
  // };

  // const buttonAll = async () => {
  //   const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   const { meals } = data;
  //   setReceivedFoods(meals);
  //   setSelectedFilter('');
  // };

  return (
    pathname.includes('explore/foods/nationalities')
      ? <FilterFoodsDropdown /> : <FilterFoodsButtons />
  );
}

export default FilterFoods;
