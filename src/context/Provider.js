import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    const validateLogin = () => {
      const MIN = 6;
      const validate = ((password.length >= MIN) && (/\S+@\S+\.\S+/.test(email)));
      /* Logica para alterar o disable de acordo com o oposto
        do booleano de validate */
      setBtnDisabled(!validate);
    };
    validateLogin();
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
  }, [email, password]);

  const contextValue = {
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
