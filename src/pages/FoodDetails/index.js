import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Meal from '../../components/Meal';
import { getFoodById } from '../../services/fetchFoods';
import RecipeNotFound from '../../components/RecipeNotFound';

const FoodDetailsScreen = () => {
  const location = useLocation();
  const [renderFood, setFood] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  console.log('renderizou');

  useEffect(() => {
    const getFoodNevertheless = async () => {
      if (location.state) {
        setFood(location.state.food);
      } else {
        try {
          const food = await getFoodById(id);
          console.log('food no getnev ', food);
          setFood(food);
        } catch (err) {
          console.log(err);
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
            <Meal
              food={ renderFood }
              titleTestId="recipe-title"
              imgTestId="recipe-photo"
            />
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

/* FoodDetailsScreen.propTypes = {
  history: PropTypes.shape(PropTypes.shape),
};

FoodDetailsScreen.defaultProps = {
  history: { oi: 2 },
}; */

export default FoodDetailsScreen;
