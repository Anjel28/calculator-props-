import React from 'react'
import { useState } from 'react';



const Display = () => {
  const [input, setInput] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setInput('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setInput(String(digit));
      setWaitingForOperand(false);
    } else {
      setInput(input === '0' ? String(digit) : input + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setInput('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!input.includes('.')) {
      setInput(input + '.');
    }
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(input);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      let newValue = 0;

      switch (operator) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '*':
          newValue = currentValue * inputValue;
          break;
        case '/':
          newValue = currentValue / inputValue;
          break;
        default:
          break;
      }

      setPreviousValue(newValue);
      setInput(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (!operator || previousValue === null) return;
    
    performOperation(null);
    setOperator(null);
  };

  const toggleSign = () => {
    setInput(input.charAt(0) === '-' ? input.substr(1) : '-' + input);
  };

  const percentage = () => {
    const value = parseFloat(input);
    setInput(String(value / 100));
  };

  return (
    <div className="calculator">
      <div className="display">{input}</div>
      <div className="buttons">
        <button className="function" onClick={clearAll}>AC</button>
        <button className="function" onClick={toggleSign}>+/-</button>
        <button className="function" onClick={percentage}>%</button>
        <button className="operator" onClick={() => performOperation('/')}>÷</button>
        
        <button onClick={() => inputDigit(7)}>7</button>
        <button onClick={() => inputDigit(8)}>8</button>
        <button onClick={() => inputDigit(9)}>9</button>
        <button className="operator" onClick={() => performOperation('*')}>×</button>
        
        <button onClick={() => inputDigit(4)}>4</button>
        <button onClick={() => inputDigit(5)}>5</button>
        <button onClick={() => inputDigit(6)}>6</button>
        <button className="operator" onClick={() => performOperation('-')}>-</button>
        
        <button onClick={() => inputDigit(1)}>1</button>
        <button onClick={() => inputDigit(2)}>2</button>
        <button onClick={() => inputDigit(3)}>3</button>
        <button className="operator" onClick={() => performOperation('+')}>+</button>
        
        <button className="zero" onClick={() => inputDigit(0)}>0</button>
        <button onClick={inputDecimal}>.</button>
        <button className="operator" onClick={handleEquals}>=</button>
      </div>
    </div>
  );
};

export default Display;