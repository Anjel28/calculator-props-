import React from 'react'



const NumberButton = ({ number, onClick }) => {
  return (
    <button onClick={() => onClick(number)}>
      {number}
    </button>
  );
};

export default NumberButton;