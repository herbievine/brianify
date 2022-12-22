import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../lib/fetcher";
import * as z from "zod";
import { useEffect } from "react";
import { useError } from "./useError";

const buildUrl = (id: string) => {
  const baseUrl = "https://youtube-mp36.p.rapidapi.com/dl";
  const urlParams = new URLSearchParams({
    id,
  });
  return `${baseUrl}?${urlParams}`;
};

const ConverterApiSchema = z.object({
  link: z.string(),
  title: z.string(),
  progess: z.number().nullish(),
  duration: z.number(),
  status: z.string(),
  msg: z.string(),
});

const useConverter = (id?: string | null) => {
  const { error, ...rest } = useSWRImmutable<
    z.infer<typeof ConverterApiSchema>
  >(id ? buildUrl(id) : null, (url) =>
    fetcher<z.infer<typeof ConverterApiSchema>>(url, ConverterApiSchema, {
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_HOST,
      },
    })
  );
  const { setError } = useError();

  console.log(rest);

  useEffect(() => {
    if (error) {
      setError("Error fetching data from YouTube API");
      console.error(error);
    }
  }, [error]);

  return rest;
};

export { useConverter };
