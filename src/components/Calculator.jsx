import React, { useEffect, useState } from "react";
import * as math from "mathjs";

const Calculator = ({ isActive = false }) => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  // Handle numbers, operators, and decimal
  const handleInput = (val) => {
    const current = display === "Error" ? "0" : display;

    if (current === "0" && !isNaN(val)) {
      // Replace initial zero with number
      setDisplay(val);
    } else if (current === "0" && isNaN(val)) {
      // Allow operators after zero
      setDisplay(current + val);
    } else {
      setDisplay(current + val);
    }
  };

  // Evaluate using math.js
  const calculate = () => {
    try {
      const current = display === "Error" ? "0" : display;
      const result = math.evaluate(current);
      setDisplay(result.toString());
      setEquation(current + " = " + result);
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
      const current = display === "Error" ? "0" : display;
      const result = math.evaluate(`${current}/100`);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  // Handle plus/minus
  const handleSign = () => {
    if (display === "Error") {
      setDisplay("0");
      return;
    }
    if (display === "0") return;
    setDisplay(display.startsWith("-") ? display.slice(1) : `-${display}`);
  };

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event) => {
      if (event.defaultPrevented) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }

      const key = event.key;
      if (/^\d$/.test(key)) {
        event.preventDefault();
        handleInput(key);
        return;
      }

      switch (key) {
        case ".":
          event.preventDefault();
          handleInput(".");
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          event.preventDefault();
          handleInput(key);
          break;
        case "%":
          event.preventDefault();
          handlePercent();
          break;
        case "Enter":
        case "=":
          event.preventDefault();
          calculate();
          break;
        case "Escape":
        case "c":
        case "C":
          event.preventDefault();
          clear();
          break;
        case "F9":
        case "s":
        case "S":
          event.preventDefault();
          handleSign();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, handleInput, handlePercent, calculate, clear, handleSign]);

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
