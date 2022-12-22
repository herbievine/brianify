import { createContext, useState } from "react";

interface ErrorContextProps {
  error: string | null;
  setError: (error: string | null) => void;
}

const ErrorContext = createContext<ErrorContextProps>({
  error: null,
  setError: () => null,
});

interface ErrorProviderProps {
  children: React.ReactNode;
}

const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorContext };
export default ErrorProvider;
