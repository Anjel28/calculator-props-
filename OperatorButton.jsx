import React from 'react'



const OperatorButton = ({ operator, handleOperatorClick }) => {
  return (
    <button 
      className="operator-btn"
      onClick={() => handleOperatorClick(operator)}
    >
      {operator}
    </button>
  );
};

export default OperatorButton;