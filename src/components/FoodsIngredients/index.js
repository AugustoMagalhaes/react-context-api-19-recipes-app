import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getFoodsIngredients } from '../../services/fetchFoods';
import Context from '../../context/Context';
import './FoodsIngredients.css';

function FoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setReceivedFoods } = useContext(Context);
  const history = useHistory();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getFoodsIngredients();
      const maxNumber = 12;
      const results = response.slice(0, maxNumber);
      setIngredients(results);
    };
    fetchApi();
  }, []);

  const clickLink = async (ingredient) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(url);
    const data = await response.json();
    const { meals } = data;
    setReceivedFoods(meals);
    history.push('/foods');
  };

  return (
    <section>
      { ingredients.length > 0
      && ingredients.map((ingredient, index) => (
        <button
          className="ingredients"
          type="button"
          data-testid={ `${index}-ingredient-card` }
          key={ uuidv4() }
          onClick={ () => clickLink(ingredient.strIngredient) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
            alt={ `Imagem de ${ingredient.strIngredient}` }
          />
          <h3 data-testid={ `${index}-card-name` }>{ ingredient.strIngredient }</h3>
        </button>
      ))}
    </section>
  );
}

export default FoodsIngredients;
