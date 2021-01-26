import React from "react";
import "./style.css";

const AppInput = ({ source, placeholder, onInputText }) => {
  return (
    <div className="input-container">
      <img src={source} alt="test" className="input-img"></img>
      <input
        className="input-box"
        placeholder={placeholder}
        onInput={onInputText}
      />
    </div>
  );
};

export default AppInput;
