import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [receivedDrinks, setReceivedDrinks] = useState([]);
  const [receivedFoods, setReceivedFoods] = useState([]);
  const [receivedCategoryDrinks, setReceivedCategoryDrinks] = useState([]);
  const [receivedCategoryFoods, setReceivedCategoryFoods] = useState([]);
  const [searchFoodsByCategory, setSearchFoodsByCategory] = useState(false);
  const [searchDrinksByCategory, setSearchDrinksByCategory] = useState(false);

  useEffect(() => {
    const validateLogin = () => {
      const MIN = 7;
      const validate = ((password.length >= MIN) && (/\S+@\S+\.\S+/.test(email)));
      /* Logica para alterar o disable de acordo com o oposto
        do booleano de validate */
      setBtnDisabled(!validate);
    };
    validateLogin();
  }, [email, password]);

  const contextValue = {
    searchDrinksByCategory,
    setSearchDrinksByCategory,
    searchFoodsByCategory,
    setSearchFoodsByCategory,
    receivedCategoryFoods,
    setReceivedCategoryFoods,
    receivedCategoryDrinks,
    setReceivedCategoryDrinks,
    receivedDrinks,
    setReceivedDrinks,
    receivedFoods,
    setReceivedFoods,
    email,
    password,
    setEmail,
    setPassword,
    btnDisabled,
  };
  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
