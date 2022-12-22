import useSWR, { Fetcher } from "swr";
import { fetcher } from "../lib/fetcher";
import * as z from "zod";

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

const useYoutube = (query: string) => {
  const res = useSWR<z.infer<typeof YouTubeApiSchema>>(buildUrl(query), (url) =>
    fetcher<z.infer<typeof YouTubeApiSchema>>(url, YouTubeApiSchema)
  );

  return res;
};

export { useYoutube };
