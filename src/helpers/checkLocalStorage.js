export const checkIsDone = (urlId, setIsDoneRecipe) => {
  const getDoneRecipesFromStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  const findRecipeInStorage = getDoneRecipesFromStorage
    .some((recipe) => recipe.id.includes(urlId));
  setIsDoneRecipe(findRecipeInStorage);
};

export const checkIsInProgress = (urlId, setIsInProgressRecipe, recipeKey) => {
  const getInProgressRecipesFromStorage = JSON
    .parse(localStorage.getItem('inProgressRecipes'));
  if (getInProgressRecipesFromStorage) {
    const mealsKeys = getInProgressRecipesFromStorage[recipeKey];
    const findRecipeInStorage = Object.keys(mealsKeys)
      .some((recipe) => recipe.includes(urlId));
    setIsInProgressRecipe(findRecipeInStorage);
  }
};

export const checkIsFavorite = (urlId, setIsFavorite) => {
  const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const checkRecipeIsFavorite = getFavorites.some((recipe) => recipe.id === urlId);
  setIsFavorite(checkRecipeIsFavorite);
};
