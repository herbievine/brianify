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
  const [offset, setOffset] = useState(0);

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
        ),
    [input, tracks]
  );

  const next = () => {
    setOffset((prev) => prev + 5);
  };

  const prev = () => {
    setOffset((prev) => prev - 5);
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="w-full flex flex-col font-black uppercase text-sm space-y-2">
        <h3 className="truncate">Select your song from the list below:</h3>
        {computedTracks.length > 0 ? (
          computedTracks.slice(offset, offset + 5).map((track, index) => (
            <div
              key={track.trackId}
              className={`flex items-center p-2 rounded-lg space-x-4 border-2 cursor-pointer ${
                index === trackIndex ? "border-gray-200" : "border-gray-700"
              }`}
              onClick={() => setTrackIndex(index)}
            >
              <img
                src={track.artworkUrl60}
                alt={`${track.artistName} ${track.trackName} Cover`}
                className="w-10 rounded-md"
              />
              <span
                key={track.trackId}
                className={`text-xs cursor-pointer truncate ${
                  index !== trackIndex && "text-gray-500"
                }`}
              >
                {offset + 1 + index}. {track.trackName} - {track.artistName}
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
            itunesId: computedTracks[offset + trackIndex].trackId,
            title: computedTracks[offset + trackIndex].trackName,
            artist: computedTracks[offset + trackIndex].artistName,
            album: computedTracks[offset + trackIndex].collectionName,
            releaseDate:
              computedTracks[offset + trackIndex].releaseDate.split("-")[0],
            genre: computedTracks[offset + trackIndex].primaryGenreName,
          })
        }
        nextLabel="Next Page"
        next={next}
        nextDisabled={offset + 5 >= computedTracks.length}
        prevLabel="Previous Page"
        prev={prev}
        prevDisabled={offset === 0}
      />
    </div>
  );
};

export default DisplayInformation;
