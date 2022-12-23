import type React from "react";
import { YoutubeVideoSchema } from "../hooks/useYoutube";
import * as z from "zod";
import { useState } from "react";
import { useSongDataStore } from "../hooks/useSongDataStore";
import Controls from "./Controls";

interface IDisplayResultsProps {
  videos: z.infer<typeof YoutubeVideoSchema>[];
}

const DisplayResults: React.FC<IDisplayResultsProps> = ({ videos }) => {
  const [videoIndex, setVideoIndex] = useState(0);
  const { setSongData } = useSongDataStore((s) => s);

  const next = () => {
    if (videoIndex < videos.length - 1) {
      setVideoIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (videoIndex > 0) {
      setVideoIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="w-full flex justify-between items-center font-black uppercase text-sm">
        <h3 className="truncate">{videos[videoIndex].snippet.title}</h3>
        <span className="pl-6 text-xs">(click image to play)</span>
      </div>
      <div className="w-full h-96">
        <a
          href={`https://www.youtube.com/watch?v=${videos[videoIndex].id.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={videos[videoIndex].snippet.thumbnails.high.url}
            alt={videos[videoIndex].snippet.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </a>
      </div>
      <Controls
        label="Download"
        action={() => setSongData({ youtubeId: videos[videoIndex].id.videoId })}
        next={next}
        nextDisabled={videoIndex === videos.length - 1}
        prev={prev}
        prevDisabled={videoIndex === 0}
      />
    </div>
  );
};

export default DisplayResults;
