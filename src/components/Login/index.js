import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import './Login.css';
import logo from '../../images/App.png';

function Login() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    btnDisabled,
  } = useContext(Context);

  const history = useHistory();

  const redirectFromLogin = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} }));
    }
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  const inputChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const inputChangePassword = ({ target }) => {
    setPassword(target.value);
  };

  return (
    <section>
      <form>
        <img src={ logo } alt="Logo App de Receitas" />
        <input
          data-testid="email-input"
          name="email"
          value={ email }
          type="text"
          placeholder="Email"
          onChange={ inputChangeEmail }
        />
        <input
          data-testid="password-input"
          name="password"
          value={ password }
          type="password"
          placeholder="Senha"
          onChange={ inputChangePassword }
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ btnDisabled }
          onClick={ redirectFromLogin }
        >
          Enter
        </button>
      </form>
    </section>
  );
}

export default Login;
