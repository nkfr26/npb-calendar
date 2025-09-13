import { useQuery } from "@tanstack/react-query";

type Holidays = Record<string, string>;

const fetchHolidays = async (): Promise<Holidays> => {
  const response = await fetch(
    "https://nkfr26.github.io/syukujitsu-json/syukujitsu.json",
  );
  return response.ok ? await response.json() : {};
};

export const useHolidays = () => {
  const { data } = useQuery({
    queryKey: ["holidays"],
    queryFn: () => fetchHolidays(),
    initialData: {},
    initialDataUpdatedAt: 0,
  });
  return { holidays: data };
};
