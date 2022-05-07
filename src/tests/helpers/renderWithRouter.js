import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

export default function renderWithRouter(component, route = '/') {
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(

      <Router history={ history }>
        {component}
      </Router>,
      history,
    ),
    history,
  };
}
