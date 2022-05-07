const getActualRecipe = (recipeObj) => {
  if (recipeObj.idMeal) {
    return {
      id: recipeObj.idMeal,
      type: 'food',
      nationality: recipeObj.strArea,
      category: recipeObj.strCategory,
      alcoholicOrNot: '',
      name: recipeObj.strMeal,
      image: recipeObj.strMealThumb,
    };
  }
  return {
    id: recipeObj.idDrink,
    type: 'drink',
    nationality: recipeObj.strArea || '',
    category: recipeObj.strCategory,
    alcoholicOrNot: recipeObj.strAlcoholic,
    name: recipeObj.strDrink,
    image: recipeObj.strDrinkThumb,
  };
};

const handleFavorites = (recipeObj, setIsFavorite) => {
  const actualRecipe = getActualRecipe(recipeObj);
  const favoriteRecipes = localStorage.getItem('favoriteRecipes') || '[]';
  const parsedFavoriteRecipes = JSON.parse(favoriteRecipes);
  const hasFavorite = parsedFavoriteRecipes
    .some((recipe) => recipe.id === actualRecipe.id);
  if (!hasFavorite) {
    const newFavoriteRecipes = JSON.stringify([...parsedFavoriteRecipes, actualRecipe]);
    localStorage.setItem('favoriteRecipes', newFavoriteRecipes);
  } else {
    const newFavoriteRecipes = parsedFavoriteRecipes
      .filter((recipe) => recipe.id !== actualRecipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  }
  setIsFavorite(!hasFavorite);
};

export default handleFavorites;
