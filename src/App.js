import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginScreen from './pages/Login/Login';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ LoginScreen } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
