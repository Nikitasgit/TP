import React from "react";
import { ITextFieldProps } from "./TextField.props";
import "./TextField.scss";

const TextField: React.FC<ITextFieldProps> = ({
  label,
  onChange,
  value,
  placeholder,
  className,
  disabled,
  name,
  type = "text",
}) => {
  return (
    <label>
      {label}
      <input
        className={className}
        required
        readOnly={disabled}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </label>
  );
};

export default TextField;
