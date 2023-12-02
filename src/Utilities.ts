import { SGPerformer } from "./api/interfaces/SeatGeek.ts";

export const tokenizePerformers = (performers?: SGPerformer[], eventType?: string) => {
  let is1v1 = false;
  let str = "";

  if (performers && eventType) {
    if (
      eventType === "womens_college_volleyball" ||
      eventType === "nhl" ||
      eventType === "mls" ||
      eventType === "nfl" ||
      eventType.includes("nba") ||
      eventType.includes("hockey") ||
      eventType.includes("ncaa")
    ) {
      is1v1 = true;
      if (performers.length === 1) {
        str = `${performers[0].name} vs. TBD`;
      } else {
        str = `${performers[0].name} vs. ${performers[1].name}`;
      }
    } else if (performers.length > 1) {
      for (const [i, p] of performers.entries()) {
        if (p.primary) {
          str += `${p.name}//`;
        } else if (i === performers.length - 1) {
          str += p.name;
        } else {
          str += `${p.name}//`;
        }
      }
    } else {
      str += performers[0].name;
    }
  }

  str = str
    .replaceAll(" Womens Volleyball", "")
    .replaceAll(" Football", "")
    .replaceAll(" Mens Basketball", "")
    .replaceAll(" Womens Basketball", "")
    .replaceAll(" Womens National Hockey", "");

  return {
    is1v1,
    tokens: str
      .split(is1v1 ? "vs." : "//")
      .filter((e) => e.length > 0)
      .map((e) => e.trim()),
  };
};

export const lerp = (start: number, end: number, amount: number) => {
  return start + amount * (end - start);
};
