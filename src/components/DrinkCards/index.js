import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
import './DrinkCards.css';
import Cocktail from '../Cocktail';

const DrinkCards = () => {
  const { receivedDrinks } = useContext(Context);
  const maxAmountOfDrinks = 12;

  return (
    <main>
      { receivedDrinks.length > 0
      && receivedDrinks.map((drink, index) => (
        index < maxAmountOfDrinks
          && (
            <Link
              className="drink-card"
              to={ {
                pathname: `/drinks/${drink.idDrink}`,
                state: {
                  drink,
                },
              } }
              key={ uuidv4() }
            >
              <Cocktail
                imgTestId="recipe-photo"
                titleTestId="recipe-title"
                drink={ drink }
              />
            </Link>
          )))}
    </main>
  );
};

export default DrinkCards;
