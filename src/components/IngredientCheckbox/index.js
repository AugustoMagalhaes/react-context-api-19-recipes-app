import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const IngredientCheckbox = ({ id, recipeKind, ingredients,
  measures, setDisabledFinish }) => {
  const [checked, setChecked] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  console.log('sl check', selectedCheckboxes);

  useEffect(() => {
    if (selectedCheckboxes.length === 0) {
      const getStorage = localStorage.getItem('inProgressRecipes')
      || '{"meals":{}, "cocktails":{}}';
      const parsedStorage = JSON.parse(getStorage);
      const selectedList = parsedStorage[recipeKind][id] || [];
      setSelectedCheckboxes(selectedList);
    }
  }, []);

  useEffect(() => {
    if (selectedCheckboxes && ingredients) {
      const newChecked = ingredients
        .map((el) => selectedCheckboxes.includes(el.ingredient));
      console.log('new checked ', newChecked);
      setChecked(newChecked);
    }
  }, [selectedCheckboxes]);

  useEffect(() => {
    const checkFullChecked = checked.some((el) => el === false);
    console.log('check full ', checkFullChecked);
    setDisabledFinish(checkFullChecked);
  }, [checked]);

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
    if (!selectedCheckboxes.includes(target.name)) {
      const newSelected = [...selectedCheckboxes, target.name];
      updateStorage(newSelected);
      setSelectedCheckboxes(newSelected);
    } else {
      const removeSelected = selectedCheckboxes.filter((el) => el !== target.name);
      updateStorage(removeSelected);
      setSelectedCheckboxes(removeSelected);
    }
  };

  return (
    ingredients
          && ingredients.map((item, index) => (
            <p
              key={ uuidv4() }
              data-testid={ `${index}-ingredient-step` }
              className={ checked[index] ? 'ingredient-item-checked' : 'ingredient-item' }
            >
              <label htmlFor={ item.ingredient }>
                <input
                  type="checkbox"
                  name={ item.ingredient }
                  id={ item.ingredient }
                  checked={ checked[index] }
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
