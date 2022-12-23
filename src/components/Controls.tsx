import type React from "react";
import Button from "./Button";

interface IControlsProps {
  label: string;
  action: () => void;
  next: () => void;
  nextDisabled: boolean;
  prev: () => void;
  prevDisabled: boolean;
}

const Controls: React.FC<IControlsProps> = ({
  label,
  action,
  next,
  nextDisabled,
  prev,
  prevDisabled,
}) => {
  return (
    <div className="w-full flex flex-col space-y-4">
      <Button onClick={action} label={label} />
      <div className="flex justify-evenly items-center space-x-4">
        <Button onClick={prev} disabled={prevDisabled} label="Previous" />
        <Button onClick={next} disabled={nextDisabled} label="Next" />
      </div>
    </div>
  );
};

export default Controls;
