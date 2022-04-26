import React from 'react';

function Login() {
  return (
    <section>
      <form>
        <input
          data-testid="email-input"
          name="email-input"
          type="text"
          placeholder="Email"
        />
        <input
          data-testid="password-input"
          name="password-input"
          type="password"
          placeholder="Senha"
        />
        <button
          data-testid="login-submit-btn"
          type="button"
        >
          Enter
        </button>
      </form>
    </section>
  );
}

export default Login;
