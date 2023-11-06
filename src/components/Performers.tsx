import { Box, Link, Tooltip, Typography } from "@mui/joy";
import { Fragment } from "react";
import { Performer, SpotifyResult } from "../Interfaces";
import { tokenizePerformers } from "../utilities/TokenizePerformers";
import { SpotifyTooltip } from "./SpotifyTooltip";

export const Performers = (props: {
  performers: Performer[] | undefined;
  eventType: string | undefined;
  artistMap: Map<string, SpotifyResult> | undefined;
}) => {
  const { is1v1, tokens } = tokenizePerformers(
    props.performers,
    props.eventType,
  );

  return (
    <Box display="flex" flexWrap="wrap">
      {tokens.map((t, i) => {
        return (
          <Fragment key={i}>
            {props.eventType === "concert" ? (
              <Tooltip
                arrow
                title={
                  <SpotifyTooltip genres={props.artistMap?.get(t)?.genres} />
                }
                variant="plain"
                sx={{ borderRadius: "15px" }}
              >
                <Link
                  href={props.artistMap?.get(t)?.external_urls.spotify}
                  rel="noopener"
                  target="_blank"
                  sx={{
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "all 0.15s ease-out",
                    },
                  }}
                >
                  {t}
                </Link>
              </Tooltip>
            ) : (
              <Typography>{t}</Typography>
            )}
            {i !== tokens.length - 1 ? (
              <Typography level="body-sm" mx={1} my="auto">
                {is1v1 ? "vs." : "//"}
              </Typography>
            ) : null}
          </Fragment>
        );
      })}
    </Box>
  );
};
