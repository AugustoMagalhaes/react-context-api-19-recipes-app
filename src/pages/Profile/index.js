/* import React from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

function ProfileScreen() {
  const pageTitle = 'Profile';
  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ false } />
      <Footer />
    </div>
  );
}

export default ProfileScreen; */

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

function ProfileScreen() {
  const [getEmail, setGetEmail] = useState({});

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const email = JSON.parse(localStorage.getItem('user'));
      setGetEmail(email);
    }
  }, []);

  const pageTitle = 'Profile';
  const history = useHistory();

  const logoutBtn = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ false } />
      <h3 data-testid="profile-email">{getEmail.email}</h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <br />
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <br />
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => logoutBtn() }
      >
        Logout
      </button>
      <br />
      <Footer />
    </div>
  );
}

export default ProfileScreen;
