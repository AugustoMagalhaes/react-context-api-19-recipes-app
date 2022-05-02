import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const BTN_TEST_ID = 'login-submit-btn';
const STANDARD_EMAIL = 'test@test.com';
const STANDARD_PASSWORD = '1234567';
const PROFILE_BTN_TEST_ID = 'profile-top-btn';
const PAGE_TITLE_TEST_ID = 'page-title';
const SEARCH_TOP_TEST_ID = 'search-top-btn';

describe('4 - Verificando existencia dos elementos do header na rota "/foods" ', () => {
  it('9 - Testando se os três elementos existem', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_TEST_ID);
    const enterBtn = screen.getByTestId(BTN_TEST_ID);

    userEvent.type(inputEmail, STANDARD_EMAIL);
    userEvent.type(inputPassword, STANDARD_PASSWORD);
    userEvent.click(enterBtn);

    const profileBtn = screen.getByTestId(PROFILE_BTN_TEST_ID);
    const pageTitle = screen.getByTestId(PAGE_TITLE_TEST_ID);
    const searchBtn = screen.getByTestId(SEARCH_TOP_TEST_ID);
    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
});
