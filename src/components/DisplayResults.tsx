import type React from "react";
import { YoutubeVideoSchema } from "../hooks/useYoutube";
import * as z from "zod";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useConverter } from "../hooks/useConverter";

interface IDisplayResultsProps {
  videos: z.infer<typeof YoutubeVideoSchema>[];
}

const DisplayResults: React.FC<IDisplayResultsProps> = ({ videos }) => {
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoId, setVideoId] = useState<string | null>(null);
  const { data, isLoading } = useConverter(videoId);

  useEffect(() => {
    if (!isLoading && data?.link) {
      if (Math.random() * 100 === 69)
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      else window.open(data.link);
    }
  }, [isLoading, data]);

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
    <div className="w-full flex flex-col space-y-4">
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
      <Button
        onClick={() => setVideoId(videos[videoIndex].id.videoId)}
        label="Download"
      />
      <div className="flex justify-evenly items-center space-x-4">
        <Button onClick={prev} disabled={videoIndex === 0} label="Previous" />
        <Button
          onClick={next}
          disabled={videoIndex === videos.length}
          label="Next"
        />
      </div>
    </div>
  );
};

export default DisplayResults;
