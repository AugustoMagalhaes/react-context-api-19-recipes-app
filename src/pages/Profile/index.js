import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import './Profile.css';
import avatar1 from '../../images/avatar/profile1.gif';
import avatar2 from '../../images/avatar/profile2.gif';
import avatar3 from '../../images/avatar/profile3.gif';
import avatar4 from '../../images/avatar/profile4.gif';
import avatar5 from '../../images/avatar/profile5.gif';
import avatar6 from '../../images/avatar/profile6.gif';
import setaDireita from '../../images/direita.png';
import setaEsquerda from '../../images/esquerda.png';

function ProfileScreen() {
  const [getEmail, setGetEmail] = useState({});
  const [count, setCount] = useState(0);

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

  const avatarArr = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const maxNumber = 5;
  const minNumber = 0;
  const clickDireita = () => {
    if (count < maxNumber) {
      setCount(count + 1);
    } else {
      setCount(minNumber);
    }
  };

  const clickEsquerda = () => {
    if (count > minNumber) {
      setCount(count - 1);
    } else {
      setCount(maxNumber);
    }
  };

  return (
    <div>
      <Header pageTitle={ pageTitle } hasSearch={ false } />
      <section className="containerProfile">
        <div className="avatar">
          <button type="button" onClick={ clickEsquerda }>
            <img src={ setaEsquerda } alt="seta para esquerda" />
          </button>
          <img src={ avatarArr[count] } alt="imagem avatar" />
          <button type="button" onClick={ clickDireita }>
            <img src={ setaDireita } alt="seta para direita" />
          </button>
        </div>
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
      </section>
      <Footer />
    </div>
  );
}

export default ProfileScreen;
