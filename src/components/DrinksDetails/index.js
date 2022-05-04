import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getCocktailsById } from '../../services/fetchCocktails';
import RecipeNotFound from '../RecipeNotFound';
import DetailsCard from '../DetailsCard';

const DrinksDetails = () => {
  const location = useLocation();
  const [renderDrinks, setRenderDrinks] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getDrinksNevertheless = async () => {
      if (location.state) {
        setRenderDrinks(location.state.drinks);
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
        renderDrinks.strMeal
          && (
            <DetailsCard drinks={ renderDrinks } />
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
