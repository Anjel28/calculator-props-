import React from 'react'



const Button = ({ value, onClick, className = '' }) => {
  return (
    <button 
      className={`calculator-button ${className}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default Button;