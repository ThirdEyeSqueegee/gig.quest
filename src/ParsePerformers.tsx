import { Box, Link, Typography } from "@mui/joy";
import { isMobile } from "react-device-detect";
import { JSX } from "react/jsx-runtime";
import { Performer } from "./Interfaces";

export const parsePerformers = (
  performers: Performer[] | undefined,
  eventType: string | undefined
) => {
  let is1v1 = false;
  let str = "";
  if (
    eventType === "nba" ||
    eventType === "womens_college_volleyball" ||
    eventType === "hockey" ||
    eventType === "nhl" ||
    eventType === "mls" ||
    eventType?.includes("ncaa")
  ) {
    is1v1 = true;
    str = `${performers![0].name} vs. ${performers![1].name}`;
  } else {
    if (performers!.length > 1) {
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
    } else {
      str += performers![0].name;
    }
  }

  str = str.replaceAll(" Womens Volleyball", "");
  str = str.replaceAll(" Football", "");
  str = str.replaceAll(" Mens Basketball", "");
  str = str.replaceAll(" Womens Basketball", "");
  str = str.replaceAll(" Womens National Hockey", "");

  const tokens = str
    .split(is1v1 ? "vs." : "//")
    .filter((e) => e.length > 0)
    .map((e) => e.trim());
  console.log(tokens);

  if (is1v1) {
    return (
      <Box display="flex">
        <Link
          href={`https://www.google.com/search?q=${tokens[0].replaceAll(
            " ",
            "+"
          )}`}
          target="_blank"
          rel="noopener"
        >
          {tokens[0]}
        </Link>
        <Typography level="body-sm" sx={{ mx: 1, my: "auto" }}>
          {"vs."}
        </Typography>
        <Link
          href={`https://www.google.com/search?q=${tokens[1].replaceAll(
            " ",
            "+"
          )}`}
          target="_blank"
          rel="noopener"
        >
          {tokens[1]}
        </Link>
      </Box>
    );
  } else if (eventType === "concert") {
    const jsx: JSX.Element[] = [];
    tokens.forEach((t, i) => {
      jsx.push(
        <Link
          key={i}
          href={`https://open.spotify.com/search/${
            isMobile ? `results/${t}` : t
          }`}
          target="_blank"
          rel="noopener"
        >
          {t}
        </Link>
      );
      if (i !== tokens.length - 1 && tokens.length > 1) {
        jsx.push(
          <Typography
            key={10 * (i + 1)}
            level="body-sm"
            sx={{ mx: 1, my: "auto" }}
          >
            //
          </Typography>
        );
      }
    });
    return (
      <Box display="flex" flexWrap="wrap">
        {jsx}
      </Box>
    );
  } else {
    return <Typography>{str}</Typography>;
  }
};
