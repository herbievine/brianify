import type React from "react";
import { ItunesTrackSchema } from "../hooks/useItunes";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useSongDataStore } from "../hooks/useSongDataStore";
import Controls from "./Controls";

interface IDisplayInformationProps {
  input: {
    title: string;
    artist: string;
  };
  tracks: z.infer<typeof ItunesTrackSchema>[];
}

const DisplayInformation: React.FC<IDisplayInformationProps> = ({
  input,
  tracks,
}) => {
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

  useEffect(() => {
    console.log("song data", input);
  }, [input]);

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="w-full flex flex-col font-black uppercase text-sm space-y-2">
        <h3 className="truncate">Select your song from the list below:</h3>
        {tracks
          .filter(
            // match words like "edit", "remix", "version", "parody"
            (val) => {
              console.log(
                val.trackName
                  .toLowerCase()
                  .match(/(edit|remix|version|parody)/g)
              );

              return !val.trackName
                .toLowerCase()
                .match(/(edit|remix|version|parody)/g);
            }
          )
          .sort((a, b) => {
            if (input.artist.length > 0) {
              return (
                b.artistName.toLowerCase().indexOf(input.artist.toLowerCase()) -
                a.artistName.toLowerCase().indexOf(input.artist.toLowerCase())
              );
            }

            if (
              a.trackName
                .toLowerCase()
                .includes(input.title.trim().toLowerCase()) <
              b.trackName
                .toLowerCase()
                .includes(input.title.trim().toLowerCase())
            ) {
              return 1;
            } else {
              return -1;
            }
          })
          .filter(
            (val, i, arr) =>
              i ===
              arr.findIndex(
                (t) =>
                  t.artistName.toLowerCase() === val.artistName.toLowerCase() &&
                  t.trackName.toLowerCase() === val.trackName.toLowerCase()
              )
          )
          .slice(0, 5)
          .map((track, index) => (
            <div
              className="flex items-center space-x-4"
              onClick={() => setTrackIndex(index)}
            >
              <img
                src={track.artworkUrl100}
                alt={`${track.artistName} ${track.trackName} Cover`}
                className="w-12 rounded-lg"
              />
              <span
                key={track.trackId}
                className={`text-xs cursor-pointer truncate ${
                  index !== trackIndex && "text-gray-500"
                }`}
              >
                {index + 1}. {index === trackIndex && "["}
                {track.trackName} - {track.artistName}
                {index === trackIndex && "]"}
              </span>
            </div>
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
        nextDisabled={trackIndex === tracks.length - 1}
        prev={prev}
        prevDisabled={trackIndex === 0}
      />
    </div>
  );
};

export default DisplayInformation;
