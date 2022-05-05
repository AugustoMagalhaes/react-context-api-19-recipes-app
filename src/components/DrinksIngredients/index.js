import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getDrinksIngredients } from '../../services/fetchCocktails';
import Context from '../../context/Context';

function DrinksIngredients() {
  const { setReceivedDrinks } = useContext(Context);
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDrinksIngredients();
      const maxNumber = 12;
      const results = response.slice(0, maxNumber);
      setIngredients(results);
    };
    fetchApi();
  }, []);

  const clickLink = async (ingredient) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(url);
    const data = await response.json();
    const { drinks } = data;
    setReceivedDrinks(drinks);
  };

  console.log(ingredients);

  return (
    <section>
      { ingredients.length > 0
      && ingredients.map((ingredient, index) => (
        <Link
          data-testid={ `${index}-ingredient-card` }
          to="/drinks"
          key={ uuidv4() }
          onClick={ () => clickLink(ingredient.strIngredient1) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
            alt={ `Imagem de ${ingredient.strIngredient1}` }
          />
          <h3 data-testid={ `${index}-card-name` }>{ ingredient.strIngredient1 }</h3>
        </Link>
      ))}
    </section>
  );
}

export default DrinksIngredients;
