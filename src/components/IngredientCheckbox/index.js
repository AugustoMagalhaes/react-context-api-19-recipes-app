import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const IngredientCheckbox = ({ id, recipeKind, ingredients, measures }) => {
  const [checked, setChecked] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  /* useEffect(() => {
    const checkSelected = selectedCheckboxes.includes(name);
    console.log('checkSel ', selectedCheckboxes);
    setChecked(checkSelected);
  }, []); */

  const updateStorage = (newIngredientList) => {
    const getStorage = localStorage.getItem('inProgressRecipes')
      || '{"meals":{}, "cocktails":{}}';
    const parsedStorage = JSON.parse(getStorage);
    const newStorage = { ...parsedStorage,
      [recipeKind]: { ...parsedStorage[recipeKind],
        [id]: newIngredientList } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  };

  const onChangeCheckbox = ({ target }) => {
    if (checked === false) {
      const newSelected = [...selectedCheckboxes, target.name];
      updateStorage(newSelected);
      setSelectedCheckboxes(newSelected);
    } else {
      const removeSelected = selectedCheckboxes.filter((el) => el !== target.name);
      updateStorage(removeSelected);
      setSelectedCheckboxes(removeSelected);
    }
    setChecked(!checked);
  };

  /* <IngredientCheckbox
                selected={ selectedCheckboxes }
                setSelected={ setSelectedCheckboxes }
                name={ item.ingredient }
                id={ id }
                recipeKind={ recipe.idMeal ? 'meals' : 'cocktails' }
              /> */

  useEffect(() => {

  }, []);

  return (
    ingredients
          && ingredients.map((item, index) => (
            <p
              key={ uuidv4() }
              data-testid={ `${index}-ingredient-step` }
              className={ selectedCheckboxes.indexOf(item.ingredient) >= 0
                ? 'ingredient-item-checked' : 'ingredient-item' }
            >
              <label htmlFor={ item.ingredient }>
                <input
                  type="checkbox"
                  name={ item.ingredient }
                  id={ item.ingredient }
                  checked={ selectedCheckboxes.includes(item.ingredient) }
                  onChange={ onChangeCheckbox }
                />
              </label>
              { ` ${item.ingredient} x ${measures[index].measure}`}
            </p>
          ))
  );
};

IngredientCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  recipeKind: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape),
  measures: PropTypes.arrayOf(PropTypes.shape),
};

IngredientCheckbox.defaultProps = {
  selected: [],
};

export default IngredientCheckbox;
