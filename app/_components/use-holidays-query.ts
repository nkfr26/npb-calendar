import { useQuery } from "@tanstack/react-query";
import { ofetch } from "ofetch";
import * as v from "valibot";

const holidaysSchema = v.record(v.string(), v.string());

const fetchHolidays = async (): Promise<
  v.InferOutput<typeof holidaysSchema>
> => {
  try {
    const response = await ofetch(
      "https://nkfr26.github.io/syukujitsu-json/syukujitsu.json",
    );
    return v.parse(holidaysSchema, response);
  } catch {
    return {};
  }
};

export const useHolidaysQuery = () => {
  return useQuery({
    queryKey: ["holidays"],
    queryFn: () => fetchHolidays(),
  });
};
