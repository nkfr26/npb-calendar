import { useQuery } from "@tanstack/react-query";

type Holidays = Record<string, string>;

const fetchHolidays = async (): Promise<Holidays> => {
  const response = await fetch(
    "https://nkfr26.github.io/syukujitsu-json/syukujitsu.json",
  );
  return response.ok ? await response.json() : {};
};

const useHolidays = () => {
  const { data = {} } = useQuery({
    queryKey: ["holidays"],
    queryFn: () => fetchHolidays(),
  });
  return { holidays: data };
};

export { type Holidays, useHolidays };
