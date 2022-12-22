import type React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick: () => void;
}

const Button: React.FC<IButtonProps> = ({ label, onClick, ...props }) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className="w-full py-2 px-4 rounded-lg border-2 border-gray-700 bg-transparent focus:ring-none placeholder-gray-500"
    >
      {label}
    </button>
  );
};

export default Button;
