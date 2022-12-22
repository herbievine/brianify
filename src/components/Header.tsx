import type React from "react";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = ({}) => {
  return (
    <div className="w-full flex flex-col items-center py-4 space-y-2">
      <h1 className="font-black text-2xl uppercase">brian-ify</h1>
      <h2 className="font-black text-base uppercase">Spotify, but better :)</h2>
    </div>
  );
};

export default Header;
