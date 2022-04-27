import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const BTN_TEST_ID = 'login-submit-btn';
const STANDARD_EMAIL = 'test@test.com';
const STANDARD_PASSWORD = '1234567';

beforeEach(() => {
  renderWithRouter(<App />);
});

afterEach(() => {
  localStorage.clear();
});

describe('1 - Testando inputs da tela de Login', () => {
  it('2 - Criando elementos de interação em Login', () => {
    const inputEmail = screen.getByRole('textbox');
    const inputEmailByTestId = screen.getByTestId(EMAIL_TEST_ID);
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const inputPasswordByTestId = screen.getByTestId(PASSWORD_TEST_ID);
    const enterBtn = screen.getByText(/enter/i);
    const enterBtnByTestId = screen.getByTestId(BTN_TEST_ID);

    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toEqual(inputEmailByTestId);

    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toEqual(inputPasswordByTestId);

    expect(enterBtn).toBeInTheDocument();
    expect(enterBtn).toEqual(enterBtnByTestId);
  });

  it('3 - Checando se o input de email reage a inserção de caracteres', () => {
    const inputEmail = screen.getByTestId(EMAIL_TEST_ID);
    expect(inputEmail).toHaveAttribute('value', '');
    expect(inputEmail).toBeInTheDocument();

    userEvent.type(inputEmail, STANDARD_EMAIL);
    expect(inputEmail).toHaveAttribute('value', STANDARD_EMAIL);
  });

  it('4 - Checando se o input de senha reage a inserção de caracteres', () => {
    const inputPassword = screen.getByTestId(PASSWORD_TEST_ID);
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveAttribute('value', '');

    userEvent.type(inputPassword, STANDARD_PASSWORD);
    expect(inputPassword).toHaveAttribute('value', STANDARD_PASSWORD);
  });
});

describe('2 - Testando validação de formulário na tela de Login', () => {
  it('5 - Checando se o comportando de "disable" do botao Enter está correto', () => {
    const inputEmail = screen.getByTestId(EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_TEST_ID);
    const enterBtn = screen.getByTestId(BTN_TEST_ID);

    expect(inputEmail).toHaveAttribute('value', '');
    expect(inputPassword).toHaveAttribute('value', '');
    expect(enterBtn).toBeDisabled();

    userEvent.type(inputEmail, STANDARD_EMAIL);
    expect(inputEmail).toHaveAttribute('value', STANDARD_EMAIL);

    userEvent.type(inputPassword, STANDARD_PASSWORD);
    expect(inputPassword).toHaveAttribute('value', STANDARD_PASSWORD);

    expect(enterBtn).not.toBeDisabled();

    userEvent.type(inputEmail, '{backspace}testtest.com');
    expect(enterBtn).toBeDisabled();

    userEvent.type(inputEmail, `{backspace}${STANDARD_EMAIL}`);

    expect(enterBtn).not.toBeDisabled();

    userEvent.type(inputPassword, '123456');
    // O teste não reconhecer o {backspace} para input de type=password aparentemente
    expect(enterBtn).toBeDisabled();
  });
});

describe('3 - Testando criação de chaves no localStorage ao fazer login', () => {
  beforeEach(() => {
    const inputEmail = screen.getByTestId(EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_TEST_ID);
    userEvent.type(inputEmail, STANDARD_EMAIL);
    userEvent.type(inputPassword, STANDARD_PASSWORD);
  });

  it('6 - Salvando 2 tokens no localStorage', () => {
    expect(localStorage.getItem('mealsToken')).toBe('1'); // *
    expect(localStorage.getItem('mealsToken')).toBeDefined();
    expect(localStorage.getItem('cocktailsToken')).toBe('1'); // talvez mude
    expect(localStorage.getItem('cocktailsToken')).toBeDefined();
  });

  it('7 - Salvando email da pessoa no localStorage', () => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'));
    const expectedUserFromStorage = { email: STANDARD_EMAIL };
    expect(userFromStorage).toEqual(expectedUserFromStorage);
  });
});

describe('4 - Redirecionamento do login apos submissao dos dados', () => {
  it('8 - Redirecionando a pessoa para a tela principal de receitas após a '
    + 'submissão e validação de sucesso do login', () => {
    const enterBtn = screen.getByTestId(BTN_TEST_ID);
    expect(window.location.pathname).toBe('/');
    userEvent.click(enterBtn);
    expect(window.location.pathname).toBe('/foods');
  });
});
