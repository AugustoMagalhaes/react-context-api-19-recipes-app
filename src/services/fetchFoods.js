export const getFoodsByName = async (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(url);
  const data = response.json();
  const { meals } = data;
  return meals;
};

export const getFoodsByIngredient = async (ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(url);
  const data = response.json();
  const { meals } = data;
  return meals;
};

export const getFoodsByFirsLetter = async (firstLetter) => {
  /* try {
    if (firstLetter.length > 1) {
      throw new Error('Your search must have only 1 (one) character');
    }
  } catch (e) {
    global.alert(e);
    return;
  } */
  if (firstLetter.length > 1) {
    global.alert('Your search must have only 1 (one) character');
    return;
  }
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(url);
  const data = response.json();
  const { meals } = data;
  return meals;
};
