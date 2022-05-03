import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Context from '../../context/Context';
import ImageNotFound from '../../images/ImageNotFound.png';
import './FoodCards.css';

const FoodCards = () => {
  const { receivedFoods } = useContext(Context);
  const maxAmountOfFoods = 12;

  return (
    <main>
      {
        receivedFoods.map((food, index) => (
          index < maxAmountOfFoods
          && (
            <section
              key={ uuidv4() }
              data-testid={ `${index}-recipe-card` }
              className="food-card"
            >
              <h4 data-testid={ `${index}-card-name` }>
                {food.strMeal}
              </h4>
              <img
                data-testid={ `${index}-card-img` }
                src={ food.strMealThumb || ImageNotFound }
                alt={ `Imagem de ${food.strMeal}` }
              />
            </section>
          )))
      }
    </main>
  );
};

export default FoodCards;
