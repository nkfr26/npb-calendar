import { queryOptions } from "@tanstack/react-query";
import { ofetch } from "ofetch";
import * as v from "valibot";

const holidaysSchema = v.record(v.string(), v.string());

export type Holidays = v.InferOutput<typeof holidaysSchema>;

async function fetchHolidays(): Promise<v.InferOutput<typeof holidaysSchema>> {
  try {
    const response = await ofetch("https://nkfr26.github.io/syukujitsu-json/syukujitsu.json");
    return v.parse(holidaysSchema, response);
  } catch {
    return {};
  }
}

export function holidaysQueryOptions() {
  return queryOptions({
    queryKey: ["holidays"],
    queryFn: fetchHolidays,
  });
}
