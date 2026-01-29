import React from "react";
import { FaCaretDown } from "react-icons/fa";
import {  } from "";
interface InputFieldProps {
  label?: string;
  type?:
    | "text"
    | "file"
    | "number"
    | "password"
    | "email"
    | "tel"
    | "url"
    | "date"
    | "textarea";
  name?: string;
  value?: any;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Add this line
  labelClassName?: string;
  inputClassName?: string;
  containerClassName?: string;
  placeholder?: string;
  required?: boolean;
  isShowIcon?: boolean;
  error?: string;
  helperText?: string;
  InputState?: boolean;
  labelWidth?: string;
  min?: any;
  max?: any;
  maxLength?: number; // This was added previously
  refInput?: (el: any) => void; // This was added previously
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  checked,
  onChange,
  onKeyDown, // Add onKeyDown prop here
  labelClassName = "",
  inputClassName = "border border-gray-300 p-2 rounded-md bg-white shadow-sm focus:ring-main-color focus:ring-1 w-full",
  placeholder,
  required = false,
  isShowIcon = false,
  error,
  helperText,
  InputState = false,
  labelWidth = "w-1/4",
  min,
  max,
  maxLength, // Apply maxLength
  refInput, // Apply refInput
  ...rest
}) => {
  const inputElement = (
    <div className="w-full">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onKeyDown={onKeyDown} // Pass onKeyDown to input element
        placeholder={placeholder}
        disabled={InputState}
        className={`${inputClassName} ${
          error ? "border-red-500 focus:ring-red-500" : ""
        }`}
        min={min}
        max={max}
        maxLength={maxLength} // Apply maxLength
        ref={refInput} // Apply refInput
        {...rest}
      />
      {isShowIcon && (
        <FaCaretDown className="absolute right-4 top-1/2 transform -translate-y-1/2" />
      )}
      {error && (
        <div className="flex">
          <p className="text-red-500 text-xs mt-1">{error}</p>
        </div>
      )}
      {helperText && !error && (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );

  return (
    <div className="mb-2 flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className={`${labelClassName} ${labelWidth} mr-2 whitespace-nowrap font-500`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {inputElement}
    </div>
  );
};

export default InputField;
