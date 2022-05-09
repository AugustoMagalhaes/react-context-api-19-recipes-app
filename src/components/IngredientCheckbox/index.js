import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const IngredientCheckbox = ({ selected, setSelected, name, id, recipeKind }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkSelected = selected.includes(name);
    console.log('checkSel ', selected);
    setChecked(checkSelected);
  }, []);

  const updateStorage = (newIngredientList) => {
    const getStorage = localStorage.getItem('inProgressRecipes')
      || '{"meals":{}, "cocktails":{}}';
    const parsedStorage = JSON.parse(getStorage);
    const newStorage = { ...parsedStorage,
      [recipeKind]: { ...parsedStorage[recipeKind],
        [id]: newIngredientList } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  };

  const onChangeCheckbox = () => {
    if (checked === false) {
      const newSelected = [...selected, name];
      updateStorage(newSelected);
      setSelected(newSelected);
    } else {
      const removeSelected = selected.filter((el) => el !== name);
      updateStorage(removeSelected);
      setSelected(removeSelected);
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
              <label htmlFor="ingredient-checkbox">
                <input
                  type="checkbox"
                  name="ingredient-checkbox"
                  id="ingredient-checkbox"
                  checked={ checked }
                  onChange={ onChangeCheckbox }
                />
              </label>
              { ` ${item.ingredient} x ${measures[index].measure}`}
            </p>
          ))
  );
};

IngredientCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
  setSelected: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  recipeKind: PropTypes.string.isRequired,
};

IngredientCheckbox.defaultProps = {
  selected: [],
};

export default IngredientCheckbox;
