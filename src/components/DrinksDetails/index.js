import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getCocktailsById } from '../../services/fetchCocktails';
import RecipeNotFound from '../RecipeNotFound';
import DrinkDetailsCard from '../DrinkDetailsCard';

const DrinksDetails = () => {
  const location = useLocation();
  const [renderDrinks, setRenderDrinks] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  console.log(location);

  useEffect(() => {
    const getDrinksNevertheless = async () => {
      if (location.state) {
        setRenderDrinks(location.state.drinks);
      } else {
        try {
          const drinks = await getCocktailsById(id);
          console.log('drinks ', drinks);
          setRenderDrinks(drinks);
        } catch (err) {
          console.error(err);
          setNotFound(true);
        }
      }
    };
    getDrinksNevertheless();
  }, []);

  return (
    <section>
      {
        renderDrinks.strDrink
          && (
            <DrinkDetailsCard drinks={ renderDrinks } />
          )

      }
      {
        (
          notFound
          && <RecipeNotFound />
        )
      }
    </section>
  );
};

export default DrinksDetails;
