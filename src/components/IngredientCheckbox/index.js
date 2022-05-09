import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
    <section className="checkbox-container">
      {
        ingredients
        && ingredients.map((item, index) => (

          <label
            key={ item.ingredient }
            htmlFor={ item.ingredient }
            id={ item.ingredient }
            data-testid={ `${index}-ingredient-step` }
            className={ checked[index]
              ? 'ingredient-item-checked' : 'ingredient-item' }
          >
            <input
              type="checkbox"
              checked={ !!checked[index] || false }
              name={ item.ingredient }
              id={ item.ingredient }
              onChange={ onChangeCheckbox }
            />
            { ` ${item.ingredient} x ${measures[index].measure}`}
          </label>
        ))
      }

    </section>
  );
};

IngredientCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  recipeKind: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape).isRequired,
  measures: PropTypes.arrayOf(PropTypes.shape).isRequired,
  setDisabledFinish: PropTypes.func.isRequired,
};

export default IngredientCheckbox;
