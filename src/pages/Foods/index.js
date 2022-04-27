import React from 'react';
import Header from '../../components/Header/index';

function FoodsScreen() {
  const pageTitle = 'Foods';
  const hasSearch = true;
  return (
    <Header pageTitle={ pageTitle } hasSearch={ hasSearch } />
  );
}

export default FoodsScreen;
