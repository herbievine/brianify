import useSWRImmutable from "swr/immutable";
import { fetcher } from "../lib/fetcher";
import * as z from "zod";
import { useEffect } from "react";
import { useError } from "./useError";

const buildUrl = (query: string) => {
  const baseUrl = "https://youtube.googleapis.com/youtube/v3/search";
  const urlParams = new URLSearchParams({
    part: "snippet",
    maxResults: "5",
    q: query,
    type: "video",
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
  });
  return `${baseUrl}?${urlParams}`;
};

export const YoutubeVideoSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  id: z.object({
    kind: z.string(),
    videoId: z.string(),
  }),
  snippet: z.object({
    publishedAt: z.string(),
    channelId: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnails: z.object({
      default: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
      }),
      medium: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
      }),
      high: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
      }),
    }),
    channelTitle: z.string(),
    liveBroadcastContent: z.string(),
    publishTime: z.string(),
  }),
});

const YouTubeApiSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  nextPageToken: z.string(),
  regionCode: z.string(),
  pageInfo: z.object({
    totalResults: z.number(),
    resultsPerPage: z.number(),
  }),
  items: z.array(YoutubeVideoSchema),
});

const useYoutube = (query?: string | null) => {
  const { error, ...rest } = useSWRImmutable<z.infer<typeof YouTubeApiSchema>>(
    query ? buildUrl(query) : null,
    (url) => fetcher<z.infer<typeof YouTubeApiSchema>>(url, YouTubeApiSchema)
  );
  const { setError } = useError();

  useEffect(() => {
    if (error) setError("Error fetching data from the YouTube API");
  }, [error]);

  useEffect(() => {
    console.log(rest);
  }, [rest]);

  return rest;
};

export { useYoutube };
