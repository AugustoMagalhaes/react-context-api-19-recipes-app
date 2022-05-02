import React from 'react';
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

export default ProfileScreen;
