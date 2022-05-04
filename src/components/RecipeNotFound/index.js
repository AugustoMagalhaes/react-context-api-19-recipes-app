import React from 'react';
import { useHistory } from 'react-router-dom';
import ImageNotFound from '../../images/ImageNotFound.png';

const RecipeNotFound = () => {
  const history = useHistory();
  return (
    <section>
      <h1>Infelizmente sua receita não existe :(</h1>
      <img src={ ImageNotFound } alt="Comida Não Encontrada" />
      <section>
        <button
          type="button"
          onClick={ () => history.goBack() }
        >
          Voltar a pagina anterior
        </button>
      </section>

    </section>
  );
};

export default RecipeNotFound;
