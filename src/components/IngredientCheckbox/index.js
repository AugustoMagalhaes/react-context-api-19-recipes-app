import React, { useState } from 'react';

const IngredientCheckbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <label htmlFor="ingredient-checkbox">
      <input
        type="checkbox"
        name="ingredient-checkbox"
        id="ingredient-checkbox"
        checked={ checked }
        onChange={ () => setChecked(!checked) }
      />
    </label>
  );
};

export default IngredientCheckbox;
