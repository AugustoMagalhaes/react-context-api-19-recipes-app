import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getFoodById } from '../../services/fetchFoods';
import RecipeNotFound from '../RecipeNotFound';
import DetailsCard from '../DetailsCard';

const FoodDetails = () => {
  const location = useLocation();
  const [renderFood, setFood] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getFoodNevertheless = async () => {
      if (location.state) {
        setFood(location.state.food);
      } else {
        try {
          const food = await getFoodById(id);
          setFood(food);
        } catch (err) {
          console.error(err);
          setNotFound(true);
        }
      }
    };
    getFoodNevertheless();
  }, [id, location.state]);

  return (
    <section>
      {
        renderFood.strMeal
          && (
            <DetailsCard food={ renderFood } />
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

export default FoodDetails;
