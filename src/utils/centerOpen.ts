export const isCenterOpen = (hours: string): boolean => {
  if (!hours) return false;

  const normalize = hours.toLowerCase().replace(/\s+/g, "").replace(/–/g, "-");

  const match = normalize.match(/(\d{1,2})(am|pm)?-(\d{1,2})(am|pm)?/);

  if (!match) return false;

  let [, startHour, startMeridian, endHour, endMeridian] = match;

  let start = parseInt(startHour);
  let end = parseInt(endHour);

  // handle AM/PM conversion
  const to24Hour = (hour: number, meridian?: string) => {
    if (!meridian) return hour;

    if (meridian === "pm" && hour !== 12) return hour + 12;
    if (meridian === "am" && hour === 12) return 0;
    return hour;
  };

  start = to24Hour(start, startMeridian);
  end = to24Hour(end, endMeridian);

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const startMinutes = start * 60;
  const endMinutes = end * 60;

  // handles overnight ranges like 10pm - 6am
  if (endMinutes < startMinutes) {
    return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
  }

  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
};
