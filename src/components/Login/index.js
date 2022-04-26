import React, { useContext } from 'react';
import Context from '../../context/Context';

function Login() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    btnDisabled,
  } = useContext(Context);

  const inputChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const inputChangePassword = ({ target }) => {
    setPassword(target.value);
  };

  return (
    <section>
      <form>
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

        >
          Enter
        </button>
      </form>
    </section>
  );
}

export default Login;
