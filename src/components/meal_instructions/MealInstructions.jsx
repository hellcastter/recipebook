import React from 'react';
import PropTypes from 'prop-types';

function MealInstructions({ instructions, source }) {
  if (!instructions) return null;

  return (
    <>
      <h2>Instructions</h2>
      <p className="meal__instuction">{instructions}</p>

      {
        source && (
          <p>
            <a href={source} target="_blank" rel="noopener noreferrer">
              Original Recipe
            </a>
          </p>
        )
      }
    </>
  );
}

MealInstructions.propTypes = {
  instructions: PropTypes.string, source: PropTypes.string,
};

export default MealInstructions;
