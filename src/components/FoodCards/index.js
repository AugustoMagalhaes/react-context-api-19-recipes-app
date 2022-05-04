import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
/* import ImageNotFound from '../../images/ImageNotFound.png'; */
import './FoodCards.css';
import Meal from '../Meal';

const FoodCards = () => {
  const { receivedFoods } = useContext(Context);
  const maxAmountOfFoods = 12;

  return (
    <main>
      { receivedFoods.length > 0
        && receivedFoods.map((food, index) => (
          index < maxAmountOfFoods
          && (
            <Link
              className="food-card"
              key={ uuidv4() }
              data-testid={ `${index}-recipe-card` }
              to={ {
                pathname: `/foods/${food.idMeal}`,
                state: {
                  food,
                },
              } }
            >
              <Meal
                food={ food }
                index={ index }
                titleTestId={ `${index}-card-name` }
                imgTestId={ `${index}-card-img` }
              />
            </Link>
          )))}
    </main>
  );
};

export default FoodCards;
