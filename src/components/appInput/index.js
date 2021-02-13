import React from "react";
import "./style.css";

const AppInput = ({ source, placeholder, onInputText, type, defaultValue }) => {
  return (
    <div className="input-container">
      <img src={source} alt="test" className="input-img"></img>
      <input
        type={type}
        className="input-box"
        placeholder={placeholder}
        onInput={onInputText}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default AppInput;
