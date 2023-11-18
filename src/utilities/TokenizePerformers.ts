import { Performer } from "../Interfaces";

export const tokenizePerformers = (performers?: Performer[], eventType?: string) => {
  let is1v1 = false;
  let str = "";

  if (
    eventType === "womens_college_volleyball" ||
    eventType === "nhl" ||
    eventType === "mls" ||
    eventType === "nfl" ||
    eventType?.includes("nba") ||
    eventType?.includes("hockey") ||
    eventType?.includes("ncaa")
  ) {
    is1v1 = true;
    if (performers?.length === 1) {
      str = `${performers![0].name} vs. TBD`;
    } else {
      str = `${performers![0].name} vs. ${performers![1].name}`;
    }
  } else {
    if (performers!.length > 1) {
      performers?.forEach((p, i) => {
        if (p.primary) {
          str += p.name + "//";
        } else {
          if (i === performers.length - 1) {
            str += p.name;
          } else {
            str += p.name + "//";
          }
        }
      });
    } else {
      if (performers![0].name?.includes("&")) {
        str += performers![0].name.split("&").toString().replace(",", "//");
      } else {
        str += performers![0].name;
      }
    }
  }

  str = str.replaceAll(" Womens Volleyball", "");
  str = str.replaceAll(" Football", "");
  str = str.replaceAll(" Mens Basketball", "");
  str = str.replaceAll(" Womens Basketball", "");
  str = str.replaceAll(" Womens National Hockey", "");

  return {
    is1v1,
    tokens: str
      .split(is1v1 ? "vs." : "//")
      .filter(e => e.length > 0)
      .map(e => e.trim()),
  };
};
