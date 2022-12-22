import type React from "react";
import DisplayError from "../components/DisplayError";
import Header from "../components/Header";
import { useError } from "../hooks/useError";

interface IRootProps {
  children: React.ReactNode;
}

const Root: React.FC<IRootProps> = ({ children }) => {
  const { error } = useError();

  return (
    <div className="w-full h-screen font-semibold bg-gray-900 text-gray-200 whitespace-nowrap">
      <div className="w-11/12 md:w-5/6 max-w-xl mx-auto flex flex-col space-y-8">
        <Header />
        {error && <DisplayError />}
        {children}
      </div>
    </div>
  );
};

export default Root;
