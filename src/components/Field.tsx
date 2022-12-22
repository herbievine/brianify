import type React from "react";

interface IFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  hasError?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Field: React.FC<IFieldProps> = ({
  id,
  label,
  value,
  placeholder,
  hasError,
  onChange,
  onBlur,
}) => {
  return (
    <div className="w-full flex flex-col">
      <label className="text-sm uppercase font-black" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`mt-2 py-2 px-4 rounded-lg border-2 bg-transparent ring-0 placeholder-gray-500 ${
          hasError ? "border-red-700" : "border-gray-700"
        }`}
      />
    </div>
  );
};

export default Field;
