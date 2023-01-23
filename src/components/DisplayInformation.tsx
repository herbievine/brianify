import type React from "react";
import { ItunesTrackSchema } from "../hooks/useItunes";
import * as z from "zod";
import { useMemo, useState } from "react";
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
  const [limit, setLimit] = useState(5);

  const computedTracks = useMemo(
    () =>
      tracks
        .filter(
          (val) =>
            !val.trackName.toLowerCase().match(/(edit|remix|version|parody)/g)
        )
        .sort((a, b) => {
          if (input.artist.length > 0) {
            return (
              b.artistName.toLowerCase().indexOf(input.artist.toLowerCase()) -
              a.artistName.toLowerCase().indexOf(input.artist.toLowerCase())
            );
          }

          return 0;
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
        .slice(0, limit),
    [input, tracks, limit]
  );

  const next = () => {
    if (trackIndex < computedTracks.length - 1) {
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
        <div className="w-full flex items-center justify-between">
          <h3 className="truncate">Select your song from the list below:</h3>
          <button
            className="text-xs text-gray-500"
            onClick={() => setLimit((prev) => prev + 5)}
          >
            Show more
          </button>
        </div>
        {computedTracks.length > 0 ? (
          computedTracks.map((track, index) => (
            <div
              key={track.trackId}
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
          ))
        ) : (
          <span className="text-xs">No results found</span>
        )}
      </div>
      <Controls
        label="Select"
        action={() =>
          setSongData({
            itunesId: computedTracks[trackIndex].trackId,
            title: computedTracks[trackIndex].trackName,
            artist: computedTracks[trackIndex].artistName,
            album: computedTracks[trackIndex].collectionName,
            releaseDate: computedTracks[trackIndex].releaseDate.split("-")[0],
            genre: computedTracks[trackIndex].primaryGenreName,
          })
        }
        next={next}
        nextDisabled={trackIndex === computedTracks.length - 1}
        prev={prev}
        prevDisabled={trackIndex === 0}
      />
    </div>
  );
};

export default DisplayInformation;
