import type React from "react";
import { ItunesTrackSchema } from "../hooks/useItunes";
import * as z from "zod";
import { useState } from "react";
import { useSongDataStore } from "../hooks/useSongDataStore";
import Controls from "./Controls";

interface IDisplayInformationProps {
  tracks: z.infer<typeof ItunesTrackSchema>[];
}

const DisplayInformation: React.FC<IDisplayInformationProps> = ({ tracks }) => {
  const { setSongData } = useSongDataStore((s) => s);
  const [trackIndex, setTrackIndex] = useState(0);

  const next = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (trackIndex > 0) {
      setTrackIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="w-full flex flex-col font-black uppercase text-sm space-y-2">
        <h3 className="truncate">Select your song from the list below:</h3>
        {tracks.map((track, index) => (
          <span
            key={track.trackId}
            onClick={() => setTrackIndex(index)}
            className={`ml-4 text-xs ${
              index !== trackIndex && "text-gray-500"
            }`}
          >
            {index + 1}. {index === trackIndex && "["}
            {track.trackName} - {track.artistName}
            {index === trackIndex && "]"}
          </span>
        ))}
      </div>
      <Controls
        label="Select"
        action={() =>
          setSongData({
            itunesId: tracks[trackIndex].trackId,
            title: tracks[trackIndex].trackName,
            artist: tracks[trackIndex].artistName,
            album: tracks[trackIndex].collectionName,
            releaseDate: tracks[trackIndex].releaseDate.split("-")[0],
            genre: tracks[trackIndex].primaryGenreName,
          })
        }
        next={next}
        nextDisabled={trackIndex === tracks.length}
        prev={prev}
        prevDisabled={trackIndex === 0}
      />
    </div>
  );
};

export default DisplayInformation;
