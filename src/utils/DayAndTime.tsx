// src/utils/formatDate.ts
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export const formatDayAndTime = (date?: string | Date) => {
  if (!date) return "";
  const time = dayjs(date).format("hh:mm A");
  const formatted = dayjs(date).format("Do MMM YYYY");
  return `${time} | ${formatted}`;
};
