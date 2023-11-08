import { Box, Link, Tooltip, Typography } from "@mui/joy";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { EventDetails } from "../Interfaces";
import { SpotifyTooltip } from "./SpotifyTooltip";

export const Performers = (props: { eventDetails: EventDetails }) => {
  return (
    <Box display="flex" flexWrap="wrap">
      {props.eventDetails.artistDetails.map((d, i) => {
        return (
          <Fragment key={i}>
            {props.eventDetails.event.type === "concert" ? (
              <Tooltip
                arrow
                title={<SpotifyTooltip genres={d.result.genres} />}
                variant="plain"
                sx={{ borderRadius: "15px" }}
              >
                <Link
                  component={motion.a}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={d.result.external_urls?.spotify}
                  rel="noopener"
                  target="_blank"
                >
                  {d.name}
                </Link>
              </Tooltip>
            ) : props.eventDetails.event.type === "comedy" ? (
              <Link
                component={motion.a}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={`https://www.google.com/search?q=${d.name.replaceAll(
                  " ",
                  "+",
                )}+comedy`}
                rel="noopener"
                target="_blank"
              >
                {d.name}
              </Link>
            ) : (
              <Typography>{d.name}</Typography>
            )}
            {i !== props.eventDetails.artistDetails.length - 1 ? (
              <Typography level="body-sm" mx={1} my="auto">
                {props.eventDetails.is1v1 ? "vs." : "//"}
              </Typography>
            ) : null}
          </Fragment>
        );
      })}
    </Box>
  );
};
