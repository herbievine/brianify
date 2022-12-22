import type React from "react";
import { useState } from "react";
import DisplayResults from "./components/DisplayResults";
import Header from "./components/Header";
import SongForm from "./components/SongForm";
import { useYoutube } from "./hooks/useYoutube";

interface IAppProps {}

const App: React.FC<IAppProps> = ({}) => {
  const [input, setInput] = useState({
    title: "",
    artist: "",
  });
  const { data } = useYoutube(input.artist + " " + input.title + " audio");

  return (
    <div className="w-full h-screen font-semibold bg-gray-900 text-gray-200 whitespace-nowrap">
      <div className="w-11/12 md:w-5/6 max-w-xl mx-auto flex flex-col space-y-8">
        <Header />
        <SongForm onSubmit={setInput} />
        {input.title.length > 0 && data?.items && (
          <DisplayResults videos={data.items} />
        )}
      </div>
    </div>
  );
};

export default App;
