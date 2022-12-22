import type React from "react";
import { useState } from "react";
import DisplayResults from "../components/DisplayResults";
import SongForm from "../components/SongForm";
import { useYoutube } from "../hooks/useYoutube";
import Root from "../layouts/Root";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = ({}) => {
  const [input, setInput] = useState({
    title: "",
    artist: "",
  });
  const { data } = useYoutube(
    input.title.length === 0
      ? null
      : input.artist + " " + input.title + " audio"
  );

  return (
    <Root>
      <SongForm onSubmit={setInput} />
      {input.title.length > 0 && data?.items && (
        <DisplayResults videos={data.items} />
      )}
    </Root>
  );
};

export default Home;
