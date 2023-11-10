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

export const EventTypeIcon = (props: { eventType?: string }) => {
  switch (props.eventType) {
    case "nba":
      return (
        <Tooltip
          arrow
          title="NBA"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <SportsBasketball
            htmlColor="coral"
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "ncaa_basketball":
    case "ncaa_womens_basketball":
      return (
        <Tooltip
          arrow
          title="NCAA Basketball"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <SportsBasketball
            htmlColor="coral"
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "ncaa_soccer":
      return (
        <Tooltip
          arrow
          title="NCAA Soccer"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <SportsSoccer
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "mls":
      return (
        <Tooltip
          arrow
          title="MLS"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <SportsSoccer
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "ncaa_football":
      return (
        <Tooltip
          arrow
          title="NCAA Football"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <SportsFootball
            htmlColor="saddlebrown"
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "concert":
      return (
        <Tooltip
          arrow
          title="Concert"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <PlayCircle
            htmlColor="royalblue"
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "music_festival":
      return (
        <Tooltip
          arrow
          title="Music Festival"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <PlayCircle
            htmlColor="royalblue"
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "classical":
      return (
        <Tooltip
          arrow
          title="Classical"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <MusicNote
            htmlColor="slateblue"
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "classical_opera":
      return (
        <Tooltip
          arrow
          title="Opera"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <MusicNote
            htmlColor="slateblue"
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "classical_orchestral_instrumental":
      return (
        <Tooltip
          arrow
          title="Orchestra"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <MusicNote
            htmlColor="slateblue"
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "broadway_tickets_national":
    case "theater":
      return (
        <Tooltip
          arrow
          title="Theater"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <TheaterComedy
            htmlColor="lightseagreen"
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "esports":
      return (
        <Tooltip
          arrow
          title="Esports"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <SportsEsports
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "nhl":
      return (
        <Tooltip
          arrow
          title="NHL"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <SportsHockey
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "hockey":
      return (
        <Tooltip
          arrow
          title="Hockey"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <SportsHockey
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "minor_league_hockey":
      return (
        <Tooltip
          arrow
          title="Minor League Hockey"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <SportsHockey
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "family":
      return (
        <Tooltip
          arrow
          title="Family"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <Diversity3
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "comedy":
      return (
        <Tooltip
          arrow
          title="Comedy"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <EmojiEmotions
            htmlColor="gold"
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "auto_racing":
      return (
        <Tooltip
          arrow
          title="Racing"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <DirectionsCar
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    case "womens_college_volleyball":
      return (
        <Tooltip
          arrow
          title="Women's College Volleyball"
          variant="soft"
          component={motion.div}
          animate={{ opacity: [0, 1] }}
        >
          <SportsVolleyball
            component={motion.svg}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            drag
            dragSnapToOrigin
          />
        </Tooltip>
      );
    default:
      return (
        <LocalActivity
          component={motion.svg}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.75 }}
          drag
          dragSnapToOrigin
        />
      );
  }
};
