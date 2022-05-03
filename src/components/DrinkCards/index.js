import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Context from '../../context/Context';
import ImageNotFound from '../../images/ImageNotFound.png';
import './DrinkCards.css';

const DrinkCards = () => {
  const { receivedDrinks } = useContext(Context);
  const maxAmountOfDrinks = 12;

  return (
    <main>
      { receivedDrinks.length > 0
      && receivedDrinks.map((drink, index) => (
        index < maxAmountOfDrinks
          && (
            <section
              key={ uuidv4() }
              data-testid={ `${index}-recipe-card` }
              className="drink-card"
            >
              <h4
                data-testid={ `${index}-card-name` }
              >
                {drink.strDrink}
              </h4>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb || ImageNotFound }
                alt={ `Imagem de ${drink.strDrink}` }
              />
            </section>
          )))}
    </main>
  );
};

export default DrinkCards;
