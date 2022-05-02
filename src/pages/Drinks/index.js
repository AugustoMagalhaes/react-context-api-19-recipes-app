import React from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

function DrinksScreen() {
  const pageTitle = 'Drinks';
  const hasSearch = true;
  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ hasSearch } />
      <Footer />
    </div>
  );
}

export default DrinksScreen;
