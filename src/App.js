import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginScreen from './pages/Login/Login';
import FoodsScreen from './pages/Foods';
import DrinksScreen from './pages/Drinks';
import ExploreScreen from './pages/Explore';
import ExploreFoodsScreen from './pages/ExploreFoods';
import ExploreDrinksScreen from './pages/ExploreDrinks';
import ExploreFoodsIngScreen from './pages/ExploreFoodsIng';
import ExploreDrinksIngScreen from './pages/ExploreDrinksIng';
import ExploreNationalitiesScreen from './pages/ExploreNationalities';
import ProfileScreen from './pages/Profile';
import DoneRecipesScreen from './pages/DoneRecipes';
import FavoriteRecipesScreen from './pages/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/favorite-recipes" component={ FavoriteRecipesScreen } />
        <Route exact path="/done-recipes" component={ DoneRecipesScreen } />
        <Route exact path="/profile" component={ ProfileScreen } />
        <Route
          exact
          path="/explore/nationalities"
          component={ ExploreNationalitiesScreen }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreDrinksIngScreen }
        />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ ExploreFoodsIngScreen }
        />
        <Route exact path="/explore/drinks" component={ ExploreDrinksScreen } />
        <Route exact path="/explore/foods" component={ ExploreFoodsScreen } />
        <Route exact path="/explore" component={ ExploreScreen } />
        <Route exact path="/foods" component={ FoodsScreen } />
        <Route exact path="/drinks" component={ DrinksScreen } />
        <Route exact path="/" component={ LoginScreen } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
