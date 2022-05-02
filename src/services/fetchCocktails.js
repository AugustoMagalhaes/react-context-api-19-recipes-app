export const getCocktailsByName = async (name) => {
  const url = `www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(url);
  const data = await response.json();
  const { drinks } = data;
  return drinks;
};

export const getCocktailsByIngredient = async (name) => {
  const url = `www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`;
  const response = await fetch(url);
  const data = await response.json();
  const { drinks } = data;
  return drinks;
};

export const getCocktailsByFirstLetter = async (firstLetter) => {
  try {
    if (firstLetter.length > 1) {
      throw new Error('Your search must have only 1 (one) character');
    }
  } catch (e) {
    global.alert(e);
    return;
  }
  const url = `www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(url);
  const data = await response.json();
  const { drinks } = data;
  return drinks;
};
