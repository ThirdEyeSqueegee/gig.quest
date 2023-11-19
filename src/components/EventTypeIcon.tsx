import {
  DirectionsCar,
  Diversity3,
  EmojiEmotions,
  Festival,
  LocalActivity,
  MusicNote,
  PlayCircle,
  SportsBasketball,
  SportsEsports,
  SportsFootball,
  SportsHockey,
  SportsKabaddi,
  SportsSoccer,
  SportsVolleyball,
  TheaterComedy,
} from "@mui/icons-material";
import { Tooltip } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { isMobile } from "react-device-detect";

export const EventTypeIcon = memo(function EventTypeIcon(props: { eventType?: string }) {
  switch (props.eventType) {
    case "nba":
      return (
        <Tooltip title="NBA" {...styles.tooltip}>
          <SportsBasketball htmlColor="coral" {...styles.eventIcon} />
        </Tooltip>
      );
    case "ncaa_basketball":
    case "ncaa_womens_basketball":
      return (
        <Tooltip title="NCAA Basketball" {...styles.tooltip}>
          <SportsBasketball htmlColor="coral" {...styles.eventIcon} />
        </Tooltip>
      );
    case "ncaa_soccer":
      return (
        <Tooltip title="NCAA Soccer" {...styles.tooltip}>
          <SportsSoccer {...styles.eventIcon} />
        </Tooltip>
      );
    case "mls":
      return (
        <Tooltip title="MLS" {...styles.tooltip}>
          <SportsSoccer {...styles.eventIcon} />
        </Tooltip>
      );
    case "ncaa_football":
      return (
        <Tooltip title="NCAA Football" {...styles.tooltip}>
          <SportsFootball htmlColor="saddlebrown" {...styles.eventIcon} />
        </Tooltip>
      );
    case "concert":
      return (
        <Tooltip title="Concert" {...styles.tooltip}>
          <PlayCircle htmlColor="royalblue" {...styles.eventIcon} />
        </Tooltip>
      );
    case "music_festival":
      return (
        <Tooltip title="Music Festival" {...styles.tooltip}>
          <Festival htmlColor="royalblue" {...styles.eventIcon} />
        </Tooltip>
      );
    case "classical":
      return (
        <Tooltip title="Classical" {...styles.tooltip}>
          <MusicNote htmlColor="slateblue" {...styles.eventIcon} />
        </Tooltip>
      );
    case "classical_opera":
      return (
        <Tooltip title="Opera" {...styles.tooltip}>
          <MusicNote htmlColor="slateblue" {...styles.eventIcon} />
        </Tooltip>
      );
    case "classical_orchestral_instrumental":
      return (
        <Tooltip title="Orchestra" {...styles.tooltip}>
          <MusicNote htmlColor="slateblue" {...styles.eventIcon} />
        </Tooltip>
      );
    case "broadway_tickets_national":
    case "theater":
      return (
        <Tooltip title="Theater" {...styles.tooltip}>
          <TheaterComedy htmlColor="lightseagreen" {...styles.eventIcon} />
        </Tooltip>
      );
    case "esports":
      return (
        <Tooltip title="Esports" {...styles.tooltip}>
          <SportsEsports {...styles.eventIcon} />
        </Tooltip>
      );
    case "nhl":
      return (
        <Tooltip title="NHL" {...styles.tooltip}>
          <SportsHockey {...styles.eventIcon} />
        </Tooltip>
      );
    case "hockey":
      return (
        <Tooltip title="Hockey" {...styles.tooltip}>
          <SportsHockey {...styles.eventIcon} />
        </Tooltip>
      );
    case "minor_league_hockey":
      return (
        <Tooltip title="Minor League Hockey" {...styles.tooltip}>
          <SportsHockey {...styles.eventIcon} />
        </Tooltip>
      );
    case "family":
      return (
        <Tooltip title="Family" {...styles.tooltip}>
          <Diversity3 {...styles.eventIcon} />
        </Tooltip>
      );
    case "comedy":
      return (
        <Tooltip title="Comedy" {...styles.tooltip}>
          <EmojiEmotions htmlColor="gold" {...styles.eventIcon} />
        </Tooltip>
      );
    case "auto_racing":
      return (
        <Tooltip title="Racing" {...styles.tooltip}>
          <DirectionsCar {...styles.eventIcon} />
        </Tooltip>
      );
    case "womens_college_volleyball":
      return (
        <Tooltip title="Women's College Volleyball" {...styles.tooltip}>
          <SportsVolleyball {...styles.eventIcon} />
        </Tooltip>
      );
    case "wrestling":
      return (
        <Tooltip title="Wrestling" {...styles.tooltip}>
          <SportsKabaddi {...styles.eventIcon} />
        </Tooltip>
      );
    case "nfl":
      return (
        <Tooltip title="NFL" {...styles.tooltip}>
          <SportsFootball htmlColor="saddlebrown" {...styles.eventIcon} />
        </Tooltip>
      );
    case "nba_dleague":
      return (
        <Tooltip title="NBA D-League" {...styles.tooltip}>
          <SportsBasketball htmlColor="coral" {...styles.eventIcon} />
        </Tooltip>
      );
    default:
      return <LocalActivity {...styles.eventIcon} />;
  }
});

const styles = {
  eventIcon: {
    component: m.svg,
    whileHover: { scale: 1.15 },
    whileTap: { scale: 0.75 },
    drag: !isMobile,
    dragSnapToOrigin: !isMobile,
    dragTransition: { bounceStiffness: 500, bounceDamping: 10 },
  },
  tooltip: {
    component: m.div,
    animate: { opacity: [0, 1] },
    sx: { backgroundColor: "transparent", backdropFilter: "blur(15px)" },
  },
};
