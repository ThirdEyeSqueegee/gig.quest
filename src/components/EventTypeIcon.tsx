import {
  DirectionsCar,
  Diversity3,
  EmojiEmotions,
  LocalActivity,
  MusicNote,
  PlayCircle,
  SportsBasketball,
  SportsEsports,
  SportsFootball,
  SportsHockey,
  SportsSoccer,
  SportsVolleyball,
  TheaterComedy,
} from "@mui/icons-material";
import { Tooltip } from "@mui/joy";
import { isMobile } from "react-device-detect";

export const EventTypeIcon = (props: { eventType: string | undefined }) => {
  switch (props.eventType) {
    case "nba":
      return (
        <Tooltip arrow title="NBA" variant="soft">
          <SportsBasketball color="warning" sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "ncaa_basketball":
    case "ncaa_womens_basketball":
      return (
        <Tooltip arrow title="NCAA Basketball" variant="soft">
          <SportsBasketball color="warning" sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "ncaa_soccer":
      return (
        <Tooltip arrow title="NCAA Soccer" variant="soft">
          <SportsSoccer sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "mls":
      return (
        <Tooltip arrow title="MLS" variant="soft">
          <SportsSoccer sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "ncaa_football":
      return (
        <Tooltip arrow title="NCAA Football" variant="soft">
          <SportsFootball
            style={{ color: "saddlebrown" }}
            sx={{ mt: isMobile ? 0 : 1 }}
          />
        </Tooltip>
      );
    case "concert":
      return (
        <Tooltip arrow title="Concert" variant="soft">
          <PlayCircle color="primary" sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "music_festival":
      return (
        <Tooltip arrow title="Music Festival" variant="soft">
          <PlayCircle sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "classical":
      return (
        <Tooltip arrow title="Classical" variant="soft">
          <MusicNote color="secondary" sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "classical_opera":
      return (
        <Tooltip arrow title="Opera" variant="soft">
          <MusicNote color="secondary" sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "classical_orchestral_instrumental":
      return (
        <Tooltip arrow title="Orchestra" variant="soft">
          <MusicNote color="secondary" sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "broadway_tickets_national":
    case "theater":
      return (
        <Tooltip arrow title="Theater" variant="soft">
          <TheaterComedy color="success" sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "esports":
      return (
        <Tooltip arrow title="Esports" variant="soft">
          <SportsEsports sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "nhl":
      return (
        <Tooltip arrow title="NHL" variant="soft">
          <SportsHockey sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "hockey":
      return (
        <Tooltip arrow title="Hockey" variant="soft">
          <SportsHockey sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "minor_league_hockey":
      return (
        <Tooltip arrow title="Minor League Hockey" variant="soft">
          <SportsHockey sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "family":
      return (
        <Tooltip arrow title="Family" variant="soft">
          <Diversity3 sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "comedy":
      return (
        <Tooltip arrow title="Comedy" variant="soft">
          <EmojiEmotions
            style={{ color: "gold" }}
            sx={{ mt: isMobile ? 0 : 1 }}
          />
        </Tooltip>
      );
    case "auto_racing":
      return (
        <Tooltip arrow title="Racing" variant="soft">
          <DirectionsCar sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    case "womens_college_volleyball":
      return (
        <Tooltip arrow title="Women's College Volleyball" variant="soft">
          <SportsVolleyball sx={{ mt: isMobile ? 0 : 1 }} />
        </Tooltip>
      );
    default:
      return <LocalActivity sx={{ mt: isMobile ? 0 : 1 }} />;
  }
};
