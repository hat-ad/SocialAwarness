import React from "react";
import "./style.css";

const HomeInput = ({
  source,
  placeholder,
  disabled,
  styleImg,
  styleInput,
  value,
  onInputText,
}) => {
  return (
    <div
      className={
        disabled ? "input-container-box" : "input-container-box active"
      }
    >
      <img className="input-ico" src={source} alt="img" style={styleImg} />
      <input
        className="ico-input"
        disabled={disabled}
        placeholder={placeholder}
        style={styleInput}
        onInput={onInputText}
        defaultValue={value}
      />
    </div>
  );
};

export default HomeInput;

// <div
//   className={
//     disabled
//       ? "input-group flex-nowrap"
//       : "input-group flex-nowrap underline-active"
//   }
//   style={{ marginBottom: "1rem" }}
// >
//   <div className="input-group-prepend">
//     <img
//       className="card-img-top "
//       id="addon-wrapping"
//       src={source}
//       alt="test"
//       style={{ color: "black", paddingLeft: "0.5rem" }}
//     />
//   </div>
//   <input
//     type="text"
//     className="form-control ico-input shadow-none"
//     placeholder={placeholder}
//     aria-describedby="addon-wrapping"
//     disabled={disabled}
//   />
// </div>
