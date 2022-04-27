import React from 'react';
import Header from '../../components/Header/index';

function ProfileScreen() {
  const pageTitle = 'Profile';
  return (
    <Header pageTitle={ pageTitle } hasSearch={ false } />
  );
}

export default ProfileScreen;
