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
              data-testid={ `${index}-recipe-card` }
              to={ {
                pathname: `/drinks/${drink.idDrink}`,
                state: {
                  drink,
                },
              } }
              key={ uuidv4() }
            >
              <Cocktail
                imgTestId={ `${index}-card-img` }
                titleTestId={ `${index}-card-name` }
                drink={ drink }
                index={ index }
              />
            </Link>
          )))}
    </main>
  );
};

export default DrinkCards;
