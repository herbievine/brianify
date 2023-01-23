import type React from "react";
import { useEffect, useState } from "react";
import DisplayError from "./components/DisplayError";
import DisplayInformation from "./components/DisplayInformation";
import DisplayResults from "./components/DisplayResults";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SongForm from "./components/SongForm";
import { useConverter } from "./hooks/useConverter";
import { useError } from "./hooks/useError";
import { useItunes } from "./hooks/useItunes";
import { useSongDataStore } from "./hooks/useSongDataStore";
import { useYoutube } from "./hooks/useYoutube";

interface IAppProps {}

const App: React.FC<IAppProps> = ({}) => {
  const { error, setError } = useError();
  const { songData, clearSongData } = useSongDataStore((s) => s);
  const { data: converterData, isLoading: converterLoading } = useConverter(
    songData.youtubeId
  );
  const [input, setInput] = useState({
    title: "",
    artist: "",
  });
  const { data: youtubeData } = useYoutube(
    !songData.title ? null : songData.title + " " + songData.artist + " audio"
  );
  const { data: itunesData } = useItunes(
    input.title.length === 0 ? null : input.artist + " " + input.title
  );

  useEffect(() => {
    if (!converterLoading && converterData?.link) {
      setError("");

      const win = window.open(converterData.link);

      if (!win || win.closed || typeof win.closed === "undefined") {
        setError("Please allow popups for this website");
      }

      clearSongData();
    }
  }, [converterLoading, converterData]);

  return (
    <div className="w-full h-screen font-semibold bg-gray-900 text-gray-200 whitespace-nowrap">
      <div className="w-11/12 md:w-5/6 py-8 max-w-xl mx-auto flex flex-col space-y-8">
        <Header />
        {error && <DisplayError />}
        <SongForm onSubmit={setInput} />
        {input.title.length > 0 && itunesData?.resultCount && !youtubeData && (
          <DisplayInformation input={input} tracks={itunesData.results} />
        )}
        {songData.title?.length && youtubeData?.items && (
          <DisplayResults videos={youtubeData.items} />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default App;
