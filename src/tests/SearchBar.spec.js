import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import * as API from '../services/fetchFoods';

const mealsByIngredient = require('../../cypress/mocks/mealsByIngredient');
const soupMeals = require('../../cypress/mocks/soupMeals');
const meals = require('../../cypress/mocks/meals');
const mealCategories = require('../../cypress/mocks/mealCategories');

const BTN_SEARCH_OPEN = 'search-top-btn';
const INPUT_SEARCH = 'search-input';
const BTN_SEARCH = 'exec-search-btn';
const ING_SEARCH_RADIO = 'ingredient-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const LETTER_SEARCH_RADIO = 'first-letter-search-radio';

jest.mock('../services/fetchFoods');

describe('4 - Verificando o componente SearchBar', () => {
  beforeEach(() => {
    API.getInicialApi.mockResolvedValue(meals.meals);
    API.getFoodsByName.mockResolvedValue(soupMeals.meals);
    API.getFoodsByIngredient.mockResolvedValue(mealsByIngredient.meals);
    API.getFoodsByFirsLetter.mockResolvedValue(meals.meals);
    // jest.spyOn(API, 'getFoodsByName').mockResolvedValue(soupMeals);
    // jest.spyOn(API, 'getFoodsByIngredient').mockResolvedValue(mealsByIngredient);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('13 - Implementação dos elementos de busca', () => {
    renderWithRouter(<App />, ['/foods']);
    const searchOpenBnt = screen.getByTestId(BTN_SEARCH_OPEN);
    userEvent.click(searchOpenBnt);

    const searchInput = screen.getByTestId(INPUT_SEARCH);
    const searchBtn = screen.getByTestId(BTN_SEARCH);
    const ingSearchRadio = screen.getByTestId(ING_SEARCH_RADIO);
    const nameSearchRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const letterSearchRadio = screen.getByTestId(LETTER_SEARCH_RADIO);

    expect(searchInput).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(ingSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(letterSearchRadio).toBeInTheDocument();
  });
  it('14.1 - Verifica endpoint da API ao clicar em ingredient', async () => {
    renderWithRouter(<App />, ['/foods']);

    const searchOpenBnt = screen.getByTestId(BTN_SEARCH_OPEN);
    userEvent.click(searchOpenBnt);

    const searchInput = screen.getByTestId(INPUT_SEARCH);
    const searchBtn = screen.getByTestId(BTN_SEARCH);

    userEvent.type(searchInput, 'Chicken');
    userEvent.click(searchBtn);
    console.log('chegou');

    const firstCard = await screen.findByText('Brown Stew Chicken');
    expect(firstCard).toBeInTheDocument();
  });
  it('14.2 - Verifica endpoint da API ao clicar em name', async () => {
    renderWithRouter(<App />, ['/foods']);

    const searchOpenBnt = screen.getByTestId(BTN_SEARCH_OPEN);
    userEvent.click(searchOpenBnt);

    const searchInput = screen.getByTestId(INPUT_SEARCH);
    const searchBtn = screen.getByTestId(BTN_SEARCH);
    const nameSearchRadio = screen.getByTestId(NAME_SEARCH_RADIO);

    userEvent.type(searchInput, 'soup');
    userEvent.click(nameSearchRadio);
    userEvent.click(searchBtn);

    const firstCard = await screen.findByText('Leblebi Soup');
    expect(firstCard).toBeInTheDocument();
  });
  it('14.3 - Verifica endpoint da API ao clicar em letter', async () => {
    renderWithRouter(<App />, ['/foods']);

    const searchOpenBnt = screen.getByTestId(BTN_SEARCH_OPEN);
    userEvent.click(searchOpenBnt);

    const searchInput = screen.getByTestId(INPUT_SEARCH);
    const searchBtn = screen.getByTestId(BTN_SEARCH);
    const letterSearchRadio = screen.getByTestId(LETTER_SEARCH_RADIO);

    userEvent.type(searchInput, 'a');
    userEvent.click(letterSearchRadio);
    userEvent.click(searchBtn);

    expect(API.getFoodsByFirsLetter).toHaveBeenCalledWith('a');
  });
});
