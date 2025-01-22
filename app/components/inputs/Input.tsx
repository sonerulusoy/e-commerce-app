"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
  errors,
  onChange,
}) => {
  return (
    <div className="w-full mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        onChange={onChange}
        className={`
          mt-1
          block
          w-full
          px-3
          py-2
          text-base
          border 
          rounded-md
          shadow-sm
          focus:outline-none
          focus:ring-indigo-500
          focus:border-indigo-500
          sm:text-sm
          ${errors[id] ? "border-red-500" : "border-gray-300"}
          ${disabled ? "bg-gray-100" : "bg-white"}
        `}
      />
      {errors[id]?.message && (
        <p className="mt-1 text-sm text-red-600">
          {String(errors[id]?.message)}
        </p>
      )}
    </div>
  );
};

export default Input;
