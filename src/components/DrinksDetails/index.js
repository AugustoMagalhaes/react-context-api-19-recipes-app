import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getCocktailsById } from '../../services/fetchCocktails';
import RecipeNotFound from '../RecipeNotFound';
import DrinkDetailsCard from '../DrinkDetailsCard';

const DrinksDetails = () => {
  const location = useLocation();
  const [renderDrink, setRenderDrinks] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getDrinksNevertheless = async () => {
      if (location.state) {
        setRenderDrinks(location.state.drink);
      } else {
        try {
          const drinks = await getCocktailsById(id);
          setRenderDrinks(drinks);
        } catch (err) {
          console.error(err);
          setNotFound(true);
        }
      }
    };
    getDrinksNevertheless();
  }, [id, location.state]);

  return (
    <section>
      {
        renderDrink.strDrink
          && (
            <DrinkDetailsCard drink={ renderDrink } />
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
