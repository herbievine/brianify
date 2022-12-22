import type React from "react";
import { useError } from "../hooks/useError";

interface IDisplayErrorProps {}

const DisplayError: React.FC<IDisplayErrorProps> = ({}) => {
  const { error } = useError();

  return (
    <div className="w-full">
      <div className="w-full py-2 px-4 rounded-lg border-2 border-red-700 bg-transparent focus:ring-0 placeholder-gray-500">
        {error}
      </div>
    </div>
  );
};

export default DisplayError;
