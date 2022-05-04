import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import { getFoodRandom } from '../../services/fetchFoods';

function ExploreFoodsScreen({ history }) {
  const pageTitle = 'Explore Foods';

  const click = async () => {
    const id = await getFoodRandom();
    history.push(`/foods/${id}`);
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ click }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

ExploreFoodsScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreFoodsScreen;
