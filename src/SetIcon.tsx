import {
  SportsBasketball,
  SportsSoccer,
  SportsFootball,
  PlayCircle,
  MusicNote,
  TheaterComedy,
  SportsEsports,
  SportsHockey,
  Diversity3,
  DirectionsCar,
  SportsVolleyball,
  LocalActivity,
  EmojiEmotions,
} from "@mui/icons-material";
import { Tooltip } from "@mui/joy";

export const setIcon = (eventType: string) => {
  switch (eventType) {
    case "nba":
      return (
        <Tooltip title="NBA" variant="soft" size="lg" arrow>
          <SportsBasketball color="warning" />
        </Tooltip>
      );
    case "ncaa_basketball":
    case "ncaa_womens_basketball":
      return (
        <Tooltip title="NCAA Basketball" variant="soft" size="lg" arrow>
          <SportsBasketball color="warning" />
        </Tooltip>
      );
    case "ncaa_soccer":
      return (
        <Tooltip title="NCAA Soccer" variant="soft" size="lg" arrow>
          <SportsSoccer />
        </Tooltip>
      );
    case "mls":
      return (
        <Tooltip title="MLS" variant="soft" size="lg" arrow>
          <SportsSoccer />
        </Tooltip>
      );
    case "ncaa_football":
      return (
        <Tooltip title="NCAA Football" variant="soft" size="lg" arrow>
          <SportsFootball style={{ color: "saddlebrown" }} />
        </Tooltip>
      );
    case "concert":
      return (
        <Tooltip title="Concert" variant="soft" size="lg" arrow>
          <PlayCircle color="primary" />
        </Tooltip>
      );
    case "music_festival":
      return (
        <Tooltip title="Music Festival" variant="soft" size="lg" arrow>
          <PlayCircle />
        </Tooltip>
      );
    case "classical":
      return (
        <Tooltip title="Classical" variant="soft" size="lg" arrow>
          <MusicNote color="secondary" />
        </Tooltip>
      );
    case "classical_opera":
      return (
        <Tooltip title="Opera" variant="soft" size="lg" arrow>
          <MusicNote color="secondary" />
        </Tooltip>
      );
    case "classical_orchestral_instrumental":
      return (
        <Tooltip title="Orchestra" variant="soft" size="lg" arrow>
          <MusicNote color="secondary" />
        </Tooltip>
      );
    case "broadway_tickets_national":
    case "theater":
      return (
        <Tooltip title="Theater" variant="soft" size="lg" arrow>
          <TheaterComedy color="success" />
        </Tooltip>
      );
    case "esports":
      return (
        <Tooltip title="Esports" variant="soft" size="lg" arrow>
          <SportsEsports />
        </Tooltip>
      );
    case "nhl":
      return (
        <Tooltip title="NHL" variant="soft" size="lg" arrow>
          <SportsHockey />
        </Tooltip>
      );
    case "minor_league_hockey":
      return (
        <Tooltip title="Minor League Hockey" variant="soft" size="lg" arrow>
          <SportsHockey />
        </Tooltip>
      );
    case "family":
      return (
        <Tooltip title="Family" variant="soft" size="lg" arrow>
          <Diversity3 />
        </Tooltip>
      );
    case "comedy":
      return (
        <Tooltip title="Comedy" variant="soft" size="lg" arrow>
          <EmojiEmotions style={{ color: "gold" }} />
        </Tooltip>
      );
    case "auto_racing":
      return (
        <Tooltip title="Racing" variant="soft" size="lg" arrow>
          <DirectionsCar />
        </Tooltip>
      );
    case "womens_college_volleyball":
      return (
        <Tooltip
          title="Women's College Volleyball"
          variant="soft"
          size="lg"
          arrow
        >
          <SportsVolleyball />
        </Tooltip>
      );
    default:
      return <LocalActivity />;
  }
};
