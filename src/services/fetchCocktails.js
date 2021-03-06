const alertMessage = 'Sorry, we haven\'t found any recipes for these filters.';

export const getCocktailsByName = async (name) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(url);
  const data = await response.json();
  const { drinks } = data;
  if (!drinks) {
    global.alert(alertMessage);
    return [];
  }
  return drinks;
};

export const getCocktailsByIngredient = async (ingredient) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(url);
  try {
    const data = await response.json();
    const { drinks } = data;
    return drinks;
  } catch (err) {
    console.error(err);
    global.alert(alertMessage);
    return [];
  }
};

export const getCocktailsByFirstLetter = async (firstLetter) => {
  if (firstLetter.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
    return [];
  }
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(url);
  const data = await response.json();
  const { drinks } = data;
  if (!drinks) {
    global.alert(alertMessage);
    return [];
  }
  return drinks;
};

export const getCocktailsById = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const { drinks } = data;
  return drinks[0];
};

export const getCocktailsRandom = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(url);
  const data = await response.json();
  const { drinks } = data;
  return drinks[0].idDrink;
};

export const fetchRecipeDrinks = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const data = await response.json();
  const { drinks } = data;
  return drinks;
};

export const getDrinksIngredients = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(url);
  const data = await response.json();
  const { drinks } = data;
  return drinks;
};
