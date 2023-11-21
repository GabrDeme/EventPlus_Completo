import React from "react";
import "./FormComponents.css";

export const Input = ({
  type,
  id,
  value,
  required,
  name,
  placeholder,
  manipulationFunction,
  additionalCLass = ""
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      required={required ? "required" : ""}
      className={`input-component ${additionalCLass}`}
      name={name}
      placeholder={placeholder}
      onChange={manipulationFunction}
      autoComplete="off"
    />
  );
};

export const Label = ({ htmlFor, labelText }) => {
  return <label htmlFor={htmlFor}>{labelText}</label>;
};

export const Button = ({
  textButton,
  name,
  id,
  type,
  manipulationFunction,
  additionalClass = ""
}) => {
  return (
    <button id={id} name={name} type={type} onClick={manipulationFunction} className={`button-component ${additionalClass}`}>
      {textButton}
    </button>
  );
};


export const Select = ({
  required,
  id,
  name,
  options,
  manipulationFunction,
  additionalClass,
  defaultValue,
}) => {
  return (
    <select
      name={name}
      id={id}
      required={required}
      className={`input-component ${additionalClass}`}
      value={defaultValue}
      onChange={manipulationFunction}
    >
      <option value="">Tipo Evento</option>
      {options.map((o) => {
        return (
          <option key={Math.random()} value={o.value}>{o.text}</option>
        );
      })}
    </select>
  );
};
