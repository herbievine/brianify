import { Fetcher } from "swr";
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

const data: z.infer<typeof YouTubeApiSchema> = {
  kind: "youtube#searchListResponse",
  etag: "-5s5IjpiunhN399IC1mXpbCOPcM",
  nextPageToken: "CAUQAA",
  regionCode: "FR",
  pageInfo: {
    totalResults: 12847,
    resultsPerPage: 5,
  },
  items: [
    {
      kind: "youtube#searchResult",
      etag: "u3FSxZ9yVsjH4bIwA4-HOyJYD4Y",
      id: {
        kind: "youtube#video",
        videoId: "1hHSH9sJUEo",
      },
      snippet: {
        publishedAt: "2009-11-08T03:33:12Z",
        channelId: "UCDgUVl7BW7bk6FEuiw_q2rA",
        title: "Jamiroquai - Little L",
        description:
          "Jamiroquai's official music video for 'Little l'. Click to listen to Jamiroquai on Spotify: http://smarturl.it/JamiroquaiSpot?IQid=JamiLL ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/1hHSH9sJUEo/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/1hHSH9sJUEo/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/1hHSH9sJUEo/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "JamiroquaiVEVO",
        liveBroadcastContent: "none",
        publishTime: "2009-11-08T03:33:12Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "-9BYmNi32xwN1kTDKVWXSfJW9mo",
      id: {
        kind: "youtube#video",
        videoId: "oMk1wBPiUIo",
      },
      snippet: {
        publishedAt: "2010-12-20T18:18:29Z",
        channelId: "UCDgUVl7BW7bk6FEuiw_q2rA",
        title: "Jamiroquai - Love Foolosophy (Video - Regular Version)",
        description:
          "Jamiroquai's official music video for 'Love Foolosophy'. Click to listen to Jamiroquai on Spotify: http://smarturl.it/JamiroquaiSpot?",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/oMk1wBPiUIo/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/oMk1wBPiUIo/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/oMk1wBPiUIo/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "JamiroquaiVEVO",
        liveBroadcastContent: "none",
        publishTime: "2010-12-20T18:18:29Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "bJlPJxM7vsJi12XIQijg9yYSJNY",
      id: {
        kind: "youtube#video",
        videoId: "UfhYrfzQQOI",
      },
      snippet: {
        publishedAt: "2009-07-17T04:09:11Z",
        channelId: "UCxraJwjNGpzJ0rJi6pXQxVw",
        title: "Jamiroquai - Love Foolosophy",
        description: 'Del Album "A Funk Odyssey" 2002.',
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/UfhYrfzQQOI/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/UfhYrfzQQOI/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/UfhYrfzQQOI/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "sebas25800",
        liveBroadcastContent: "none",
        publishTime: "2009-07-17T04:09:11Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "k8LHqcai-HShLPKebefludJbkp8",
      id: {
        kind: "youtube#video",
        videoId: "b8tIuFHBEl4",
      },
      snippet: {
        publishedAt: "2009-11-26T03:04:22Z",
        channelId: "UCDgUVl7BW7bk6FEuiw_q2rA",
        title: "Jamiroquai - Love Foolosophy",
        description:
          "Music video by Jamiroquai performing Love Foolosophy. YouTube view counts pre-VEVO: 3948 (c) 2002 Sony BMG Music ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/b8tIuFHBEl4/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/b8tIuFHBEl4/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/b8tIuFHBEl4/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "JamiroquaiVEVO",
        liveBroadcastContent: "none",
        publishTime: "2009-11-26T03:04:22Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "Yo4aeXlncoBq9--H7TXhB7gJrzQ",
      id: {
        kind: "youtube#video",
        videoId: "7Hiy-E5w9eE",
      },
      snippet: {
        publishedAt: "2007-10-03T17:30:39Z",
        channelId: "UCd8wWXk6fSa8b8WaZbpWgvg",
        title: "Jamiroquai - Love Foolosophy [Official Video]",
        description:
          "Jamiroquai - Love Foolosophy http://www.jamiroquai.com Follow Jamiroquai: FB: https://www.facebook.com/JamiroquaiOfficial ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/7Hiy-E5w9eE/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/7Hiy-E5w9eE/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/7Hiy-E5w9eE/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Jamiroquai Official",
        liveBroadcastContent: "none",
        publishTime: "2007-10-03T17:30:39Z",
      },
    },
  ],
};

const useYoutube = (query?: string | null) => {
  const { error, ...rest } = useSWRImmutable<z.infer<typeof YouTubeApiSchema>>(
    query ? buildUrl(query) : null,
    (url) => data //fetcher<z.infer<typeof YouTubeApiSchema>>(url, YouTubeApiSchema)
  );
  const { setError } = useError();

  useEffect(() => {
    if (error) setError("Error fetching data from YouTube API");
  }, [error]);

  return rest;
};

export { useYoutube };
