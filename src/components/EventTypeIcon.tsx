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
import { motion } from "framer-motion";

export const EventTypeIcon = (props: { eventType: string | undefined }) => {
  switch (props.eventType) {
    case "nba":
      return (
        <Tooltip arrow title="NBA" variant="soft">
          <SportsBasketball
            color="warning"
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "ncaa_basketball":
    case "ncaa_womens_basketball":
      return (
        <Tooltip arrow title="NCAA Basketball" variant="soft">
          <SportsBasketball
            color="warning"
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "ncaa_soccer":
      return (
        <Tooltip arrow title="NCAA Soccer" variant="soft">
          <SportsSoccer
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "mls":
      return (
        <Tooltip arrow title="MLS" variant="soft">
          <SportsSoccer
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "ncaa_football":
      return (
        <Tooltip arrow title="NCAA Football" variant="soft">
          <SportsFootball
            style={{ color: "saddlebrown" }}
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "concert":
      return (
        <Tooltip arrow title="Concert" variant="soft">
          <PlayCircle
            color="primary"
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "music_festival":
      return (
        <Tooltip arrow title="Music Festival" variant="soft">
          <PlayCircle
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "classical":
      return (
        <Tooltip arrow title="Classical" variant="soft">
          <MusicNote
            color="secondary"
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "classical_opera":
      return (
        <Tooltip arrow title="Opera" variant="soft">
          <MusicNote
            color="secondary"
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "classical_orchestral_instrumental":
      return (
        <Tooltip arrow title="Orchestra" variant="soft">
          <MusicNote
            color="secondary"
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "broadway_tickets_national":
    case "theater":
      return (
        <Tooltip arrow title="Theater" variant="soft">
          <TheaterComedy
            color="success"
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "esports":
      return (
        <Tooltip arrow title="Esports" variant="soft">
          <SportsEsports
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "nhl":
      return (
        <Tooltip arrow title="NHL" variant="soft">
          <SportsHockey
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "hockey":
      return (
        <Tooltip arrow title="Hockey" variant="soft">
          <SportsHockey
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "minor_league_hockey":
      return (
        <Tooltip arrow title="Minor League Hockey" variant="soft">
          <SportsHockey
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "family":
      return (
        <Tooltip arrow title="Family" variant="soft">
          <Diversity3
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "comedy":
      return (
        <Tooltip arrow title="Comedy" variant="soft">
          <EmojiEmotions
            style={{ color: "gold" }}
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "auto_racing":
      return (
        <Tooltip arrow title="Racing" variant="soft">
          <DirectionsCar
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    case "womens_college_volleyball":
      return (
        <Tooltip arrow title="Women's College Volleyball" variant="soft">
          <SportsVolleyball
            component={motion.svg}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          />
        </Tooltip>
      );
    default:
      return (
        <LocalActivity
          component={motion.svg}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
        />
      );
  }
};
