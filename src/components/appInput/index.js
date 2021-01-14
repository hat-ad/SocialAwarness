import React from "react";
import "./style.css";

const AppInput = ({ source, placeholder }) => {
  return (
    <div className="input-container">
      <img src={source} alt="test" className="input-img"></img>
      <input className="input-box" placeholder={placeholder} />
    </div>
  );
};

export default AppInput;
