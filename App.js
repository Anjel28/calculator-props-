import React, { useState } from 'react';
import Display from './components/Display';
//import Button from './components/Button';
import NumberButton from './components/NumberButton';
//import Operatorbutton from './components/OperatorButton';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [operator, setOperator] = useState(null);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
    setOperator(null);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="keypad">
        <div className="input-keys">
          <div className="function-keys">
           {/* <Button className="key-clear" onClick={clearDisplay}>AC</Button>*/}
          </div>
          <div className="digit-keys">
            <NumberButton className="key-0" onClick={() => inputDigit(0)}>0</NumberButton>
            <NumberButton className="key-dot" onClick={inputDecimal}>.</NumberButton>
            <NumberButton className="key-1" onClick={() => inputDigit(1)}>1</NumberButton>
            <NumberButton className="key-2" onClick={() => inputDigit(2)}>2</NumberButton>
            <NumberButton className="key-3" onClick={() => inputDigit(3)}>3</NumberButton>
            <NumberButton className="key-4" onClick={() => inputDigit(4)}>4</NumberButton>
            <NumberButton className="key-5" onClick={() => inputDigit(5)}>5</NumberButton>
            <NumberButton className="key-6" onClick={() => inputDigit(6)}>6</NumberButton>
            <NumberButton className="key-7" onClick={() => inputDigit(7)}>7</NumberButton>
            <NumberButton className="key-8" onClick={() => inputDigit(8)}>8</NumberButton>
            <NumberButton className="key-9" onClick={() => inputDigit(9)}>9</NumberButton>
          </div>
        </div>
        <div className="operator-keys">
         {/* <OperatorButton className="key-divide" onClick={() => performOperation('/')}>÷</OperatorButton>
          <OperatorButton className="key-multiply" onClick={() => performOperation('*')}>×</OperatorButton>
          <OperatorButton className="key-subtract" onClick={() => performOperation('-')}>−</OperatorButton>
          <OperatorButton className="key-add" onClick={() => performOperation('+')}>+</OperatorButton>
          <OperatorButton className="key-equals" onClick={() => performOperation('=')}>=</OperatorButton>*/}
        </div>
      </div>
    </div>
  );
};

export default App;