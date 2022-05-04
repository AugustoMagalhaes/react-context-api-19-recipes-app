import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
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
            <Link
              to={ `/drinks/${drink.idDrink}` }
              key={ uuidv4() }
            >
              <section
                // key={ uuidv4() }
                data-testid={ `${index}-recipe-card` }
                className="drink-card"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb || ImageNotFound }
                  alt={ `Imagem de ${drink.strDrink}` }
                />
                <h4
                  data-testid={ `${index}-card-name` }
                >
                  {drink.strDrink}
                </h4>
              </section>
            </Link>
          )))}
    </main>
  );
};

export default DrinkCards;
