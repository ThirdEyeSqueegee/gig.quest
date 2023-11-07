import { Location } from "../Interfaces";

const rad = (d: number) => {
  return d * (Math.PI / 180);
};

export const distance = (
  start: Location | undefined,
  end: Location | undefined,
) => {
  if (start === undefined || end === undefined) {
    return 0;
  }

  if (
    start.lat === null ||
    start.lon === null ||
    end.lat === null ||
    end.lon === null
  ) {
    return 0;
  }

  const latStart = rad(start.lat);
  const lonStart = rad(start.lon);
  const latEnd = rad(end.lat);
  const lonEnd = rad(end.lon);
  const lonDiff = Math.abs(lonStart - lonEnd);

  return (
    3958.7614581 *
    Math.acos(
      Math.sin(latStart) * Math.sin(latEnd) +
        Math.cos(latStart) * Math.cos(latEnd) * Math.cos(lonDiff),
    )
  ).toFixed(2);
};
