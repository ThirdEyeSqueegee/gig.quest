import { Typography } from "@mui/joy";
import { Performer } from "./Interfaces";

export const parsePerformers = (
  performers: Performer[] | undefined,
  eventType: string | undefined
) => {
  if (performers?.length === 1) {
    return <Typography level="body-lg">{performers[0].name}</Typography>;
  }

  let str = "";
  if (
    eventType === "nba" ||
    eventType === "womens_college_volleyball" ||
    eventType === "nhl" ||
    eventType === "mls" ||
    eventType?.includes("ncaa")
  ) {
    str = `${performers![0].name} vs. ${performers![1].name}`;
  } else {
    performers?.forEach((p, i) => {
      if (p.primary) {
        str += p.name + " // ";
      } else {
        if (i === performers.length - 1) {
          str += p.name;
        } else {
          str += p.name + " // ";
        }
      }
    });
  }

  str = str.replaceAll(" Womens Volleyball", "");
  str = str.replaceAll(" Football", "");
  str = str.replaceAll(" Mens Basketball", "");
  str = str.replaceAll(" Womens Basketball", "");

  return <Typography level="body-lg">{str}</Typography>;
};
