export const checkIsDone = (urlId, setIsDoneRecipe) => {
  const getDoneRecipesFromStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  const findRecipeInStorage = getDoneRecipesFromStorage
    .some((recipe) => recipe.id.includes(urlId));
  setIsDoneRecipe(findRecipeInStorage);
};

export const checkIsInProgress = (urlId, setIsInProgressRecipe, recipeKey) => {
  const getInProgressRecipesFromStorage = JSON
    .parse(localStorage.getItem('inProgressRecipes'));
  console.log('get ', getInProgressRecipesFromStorage);
  if (getInProgressRecipesFromStorage) {
    const mealsKeys = getInProgressRecipesFromStorage[recipeKey];
    const findRecipeInStorage = Object.keys(mealsKeys)
      .some((recipe) => recipe.includes(urlId));
    setIsInProgressRecipe(Number(findRecipeInStorage));
  }
};
