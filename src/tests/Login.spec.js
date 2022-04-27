import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

beforeEach(() => {
  renderWithRouter(<App />);
});

describe('1 - Criando elementos de interação em Login', () => {
  it('2 - Criando elementos de interação em Login', () => {
    const inputEmail = screen.getByRole('textbox');
    const inputEmailByTestId = screen.getByTestId('email-input');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const inputPasswordByTestId = screen.getByTestId('password-input');
    const enterBtn = screen.getByText(/enter/i);
    const enterBtnByTestId = screen.getByTestId('login-submit-btn');

    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toEqual(inputEmailByTestId);

    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toEqual(inputPasswordByTestId);

    expect(enterBtn).toBeInTheDocument();
    expect(enterBtn).toEqual(enterBtnByTestId);
  });

  it('3 - Checando se o input de email reage a inserção de caracteres', () => {
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toHaveAttribute('value', '');
    expect(inputEmail).toBeInTheDocument();

    userEvent.type(inputEmail, 'testando@test.com');
    expect(inputEmail).toHaveAttribute('value', 'testando@test.com');
  });

  it('4 - Checando se o input de senha reage a inserção de caracteres', () => {
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveAttribute('value', '');

    userEvent.type(inputPassword, '123456');
    expect(inputPassword).toHaveAttribute('value', '123456');
  });
});
