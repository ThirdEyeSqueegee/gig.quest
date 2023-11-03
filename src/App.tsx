import { GitHub } from "@mui/icons-material";
import { Box, Card, Divider, IconButton, Link, Typography } from "@mui/joy";
import { useOrientation } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import TypeIt from "typeit-react";
import { getArtistDetails, getEvents, getSpotifyToken } from "./API";
import { EventStack } from "./EventStack";
import EventTable from "./EventTable";
import Footer from "./Footer";
import { IEvent } from "./Interfaces";

export default function App() {
  const [page, setPage] = useState(1);
  const [range, setRange] = useState("5mi");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [events, setEvents] = useState<IEvent[]>([]);
  const [eventCount, setEventCount] = useState(0);
  const [notFound, setNotFound] = useState(false);

  const orientation = useOrientation();

  useEffect(() => {
    getEvents(page, rowsPerPage, range).then((events) => {
      setEvents(events.events);
      setEventCount(events.eventCount);
      setNotFound(events.notFound);
    });
  }, [page, rowsPerPage, range]);

  useEffect(() => {
    async function cb() {
      const token = localStorage.getItem("spotifyToken");
      if (!token) {
        await getSpotifyToken();
      }
    }

    cb();
  }, []);

  return (
    <Box
      sx={{ height: "85vh", p: orientation.type.includes("portrait") ? 1 : 2 }}
    >
      <Card sx={{ p: 0, alignItems: "center" }}>
        <Typography fontSize="4rem">
          <TypeIt>gig.quest</TypeIt>
        </Typography>
        <IconButton
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        >
          <Link
            href="https://github.com/ThirdEyeSqueegee/gig.quest"
            target="_blank"
            rel="noopener"
            overlay
            color="neutral"
          >
            <GitHub />
          </Link>
        </IconButton>
        <Divider />
        <Box width="100%">
          {orientation.type.includes("landscape") ? (
            <EventTable
              events={events}
              setEvents={setEvents}
              notFound={notFound}
              getArtistDetails={getArtistDetails}
            />
          ) : (
            <EventStack
              events={events}
              setEvents={setEvents}
              notFound={notFound}
              getArtistDetails={getArtistDetails}
            />
          )}
        </Box>
        <Footer
          page={page}
          setPage={setPage}
          range={range}
          setRange={setRange}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          justify="center"
          eventCount={eventCount}
        />
      </Card>
    </Box>
  );
}
