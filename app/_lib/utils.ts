import { createParser } from "nuqs";
import { formatDate } from "@/lib/utils";

export const dateParser = createParser({
  parse(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  },
  serialize(value) {
    return formatDate(value);
  },
});

export const monthParser = createParser({
  parse(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  },
  serialize(value) {
    return formatDate(value).slice(0, 7);
  },
});
