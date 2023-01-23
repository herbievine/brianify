import useSWRImmutable from "swr/immutable";
import { fetcher } from "../lib/fetcher";
import * as z from "zod";
import { useEffect } from "react";
import { useError } from "./useError";

const buildUrl = (query: string) => {
  const baseUrl = "https://itunes.apple.com/search";
  const urlParams = new URLSearchParams({
    term: query,
    entity: "song",
  });
  return `${baseUrl}?${urlParams}`;
};

export const ItunesTrackSchema = z.object({
  trackId: z.number(),
  trackName: z.string(),
  artistName: z.string(),
  collectionName: z.string(),
  artworkUrl30: z.string(),
  artworkUrl60: z.string(),
  artworkUrl100: z.string(),
  releaseDate: z.string(),
  primaryGenreName: z.string(),
});

const ItunesApiSchema = z.object({
  resultCount: z.number(),
  results: z.array(ItunesTrackSchema),
});

const useItunes = (query?: string | null) => {
  const { error, ...rest } = useSWRImmutable<z.infer<typeof ItunesApiSchema>>(
    query ? buildUrl(query) : null,
    (url) => fetcher<z.infer<typeof ItunesApiSchema>>(url, ItunesApiSchema)
  );
  const { setError } = useError();

  useEffect(() => {
    if (error) {
      setError("Error fetching data from the iTunes API");
      console.error(error);
    }
  }, [error]);

  return rest;
};

export { useItunes };
