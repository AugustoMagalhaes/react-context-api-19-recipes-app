import React from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

function ExploreFoodsScreen() {
  const pageTitle = 'Explore Foods';
  return (
    <div>
      <Header pageTitle={ pageTitle } />
      <Footer />
    </div>
  );
}

export default ExploreFoodsScreen;
