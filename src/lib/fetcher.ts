const fetcher = <T>(
  url: string,
  schema: Zod.AnyZodObject,
  config?: RequestInit
): Promise<T> =>
  fetch(url, config)
    .then((res) => res.json())
    .then((data) => schema.parse(data) as T);

export { fetcher };
