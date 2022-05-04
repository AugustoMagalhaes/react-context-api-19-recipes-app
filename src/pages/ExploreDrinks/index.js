import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import { getCocktailsRandom } from '../../services/fetchCocktails';

function ExploreDrinksScreen({ history }) {
  const pageTitle = 'Explore Drinks';

  const click = async () => {
    const results = await getCocktailsRandom();
    console.log(results);
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ false } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
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

ExploreDrinksScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreDrinksScreen;
