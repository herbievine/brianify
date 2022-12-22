const fetcher = <T>(url: string, schema: Zod.AnyZodObject): Promise<T> =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => schema.parse(data) as T);

export { fetcher };
