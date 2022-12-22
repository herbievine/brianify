import type React from "react";

interface IFooterProps {}

const Footer: React.FC<IFooterProps> = ({}) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <a
        href="https://www.herbievine.com"
        className="text-sm font-extrabold cursor-pointer"
      >
        a small app made by herbie vine
      </a>
    </div>
  );
};

export default Footer;
