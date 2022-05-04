import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

function ExploreScreen({ history }) {
  const pageTitle = 'Explore';
  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ false } />
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ () => history.push('/explore/foods') }
      >
        Explore Foods
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explore/drinks') }
      >
        Explore Drinks
      </button>
      <Footer />
    </div>
  );
}

ExploreScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreScreen;
