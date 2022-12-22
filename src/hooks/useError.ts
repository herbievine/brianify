import { useContext } from "react";
import { ErrorContext } from "../contexts/Error";

const useError = () => {
  const error = useContext(ErrorContext);

  if (!error) {
    throw new Error("`useError` must be used within an `ErrorProvider`");
  }

  return error;
};

export { useError };
