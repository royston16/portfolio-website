import React, { useState } from "react";
import * as math from "mathjs";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  // Handle numbers, operators, and decimal
  const handleInput = (val) => {
    if (display === "Error") setDisplay("0"); // Reset on error
    
    if (display === "0" && !isNaN(val)) {
      // Replace initial zero with number
      setDisplay(val);
    } else if (display === "0" && isNaN(val)) {
      // Allow operators after zero
      setDisplay(display + val);
    } else {
      setDisplay(display + val);
    }
  };

  // Evaluate using math.js
  const calculate = () => {
    try {
      const result = math.evaluate(display);
      setDisplay(result.toString());
      setEquation(display + " = " + result);
    } catch (error) {
      setDisplay("Error");
      setEquation("");
    }
  };

  // Clear everything
  const clear = () => {
    setDisplay("0");
    setEquation("");
  };

  // Handle percentage
  const handlePercent = () => {
    try {
      const result = math.evaluate(`${display}/100`);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  // Handle plus/minus
  const handleSign = () => {
    if (display === "0" || display === "Error") return;
    setDisplay(display.startsWith("-") ? display.slice(1) : `-${display}`);
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="calculator-equation">{equation}</div>
        <div>{display}</div>
      </div>
      <div className="calculator-buttons">
        <button className="calc-btn special" onClick={clear}>AC</button>
        <button className="calc-btn special" onClick={handleSign}>±</button>
        <button className="calc-btn special" onClick={handlePercent}>%</button>
        <button className="calc-btn operator" onClick={() => handleInput("/")}>÷</button>

        <button className="calc-btn" onClick={() => handleInput("7")}>7</button>
        <button className="calc-btn" onClick={() => handleInput("8")}>8</button>
        <button className="calc-btn" onClick={() => handleInput("9")}>9</button>
        <button className="calc-btn operator" onClick={() => handleInput("*")}>×</button>

        <button className="calc-btn" onClick={() => handleInput("4")}>4</button>
        <button className="calc-btn" onClick={() => handleInput("5")}>5</button>
        <button className="calc-btn" onClick={() => handleInput("6")}>6</button>
        <button className="calc-btn operator" onClick={() => handleInput("-")}>−</button>

        <button className="calc-btn" onClick={() => handleInput("1")}>1</button>
        <button className="calc-btn" onClick={() => handleInput("2")}>2</button>
        <button className="calc-btn" onClick={() => handleInput("3")}>3</button>
        <button className="calc-btn operator" onClick={() => handleInput("+")}>+</button>

        <button className="calc-btn zero" onClick={() => handleInput("0")}>0</button>
        <button className="calc-btn" onClick={() => handleInput(".")}>.</button>
        <button className="calc-btn operator" onClick={calculate}>=</button>
      </div>
    </div>
  );
};


export default Calculator;
