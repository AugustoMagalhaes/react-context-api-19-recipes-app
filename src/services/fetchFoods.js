const alertMessage = 'Sorry, we haven\'t found any recipes for these filters.';

export const getFoodsByName = async (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(url);
  const data = await response.json();
  const { meals } = data;
  if (!meals) {
    global.alert(alertMessage);
    return [];
  }
  return meals || [];
};

export const getFoodsByIngredient = async (ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(url);
  const data = await response.json();
  const { meals } = data;
  if (!meals) {
    global.alert(alertMessage);
    return [];
  }
  return meals;
};

export const getFoodsByFirsLetter = async (firstLetter) => {
  if (firstLetter.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
    return [];
  }
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(url);
  const data = await response.json();
  const { meals } = data;
  if (!meals) {
    global.alert(alertMessage);
    return [];
  }
  return meals;
};

export const getFoodById = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const { meals } = data;
  return meals[0];
};

export const getFoodRandom = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const response = await fetch(url);
  const data = await response.json();
  const { meals } = data;
  return meals[0].idMeal;
};

export const fetchRecipeFoods = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const data = await response.json();
  const { meals } = data;
  return meals;
};

export const getFoodsIngredients = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(url);
  const data = await response.json();
  const { meals } = data;
  return meals;
};

export const getFoodsNationalities = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(url);
  const data = await response.json();
  const { meals } = data;
  return meals;
};
