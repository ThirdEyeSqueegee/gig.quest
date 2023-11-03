import { Box, Link, Tooltip, Typography } from "@mui/joy";
import { isMobile } from "react-device-detect";
import { JSX } from "react/jsx-runtime";
import { ArtistDetails, Performer } from "./Interfaces";
import { SpotifyTooltip } from "./SpotifyTooltip";

export const Performers = (props: {
  performers: Performer[];
  eventType: string;
  getArtistDetails: (artistName: string) => Promise<ArtistDetails>;
}) => {
  let is1v1 = false;
  let str = "";
  if (
    props.eventType === "nba" ||
    props.eventType === "womens_college_volleyball" ||
    props.eventType === "hockey" ||
    props.eventType === "nhl" ||
    props.eventType === "mls" ||
    props.eventType?.includes("ncaa")
  ) {
    is1v1 = true;
    str = `${props.performers![0].name} vs. ${props.performers![1].name}`;
  } else {
    if (props.performers!.length > 1) {
      props.performers?.forEach((p, i) => {
        if (p.primary) {
          str += p.name + " // ";
        } else {
          if (i === props.performers.length - 1) {
            str += p.name;
          } else {
            str += p.name + " // ";
          }
        }
      });
    } else {
      str += props.performers![0].name;
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
          vs.
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
  } else if (props.eventType === "concert") {
    const jsx: JSX.Element[] = [];
    tokens.forEach((t, i) => {
      jsx.push(
        <Tooltip
          key={i}
          title={
            <SpotifyTooltip
              artist={t}
              getArtistDetails={props.getArtistDetails}
            />
          }
          arrow
          variant="plain"
          sx={{ borderRadius: 15 }}
        >
          <Link
            href={`https://open.spotify.com/search/${
              isMobile ? `results/${t}` : t
            }`}
          >
            {t}
          </Link>
        </Tooltip>
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
      <Box display="flex" flexWrap="wrap" width={isMobile ? "90%" : "100%"}>
        {jsx}
      </Box>
    );
  } else {
    return <Typography width={isMobile ? "90%" : "100%"}>{str}</Typography>;
  }
};
