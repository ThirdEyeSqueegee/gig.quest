import { Tooltip } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";
import { isMobile } from "react-device-detect";
import {
  FaBasketball,
  FaBookOpen,
  FaCirclePlay,
  FaFaceLaughSquint,
  FaFootball,
  FaMasksTheater,
  FaPersonRunning,
  FaVolleyball,
} from "react-icons/fa6";
import { GiChargingBull, GiHorseshoe, GiMountainClimbing, GiSoccerKick, GiViolin } from "react-icons/gi";
import { IoMdBaseball } from "react-icons/io";
import { IoGolf, IoMusicalNotes } from "react-icons/io5";
import {
  MdFamilyRestroom,
  MdFestival,
  MdLocalActivity,
  MdLocalMovies,
  MdMinorCrash,
  MdPool,
  MdSportsEsports,
  MdSportsGymnastics,
  MdSportsHockey,
  MdSportsKabaddi,
  MdSportsRugby,
  MdSportsTennis,
  MdTwoWheeler,
} from "react-icons/md";
import { RiBoxingFill } from "react-icons/ri";
import { TbOlympics } from "react-icons/tb";

import { SGEventType } from "../../api/interfaces/SeatGeek.ts";
import MLBLogo from "../../assets/mlb_logo.svg";
import MLSLogo from "../../assets/mls_logo.svg";
import NBALogo from "../../assets/nba_logo.svg";
import NFLLogo from "../../assets/nfl_logo.svg";
import NHLLogo from "../../assets/nhl_logo.svg";
import { Flexbox } from "../atoms/Flexbox.tsx";

export const EventTypeIcon = memo(function EventTypeIcon(props: { eventType?: SGEventType; size?: string }) {
  const { eventType, size } = props;

  if (eventType) {
    switch (eventType) {
      case "baseball":
        return (
          <Tooltip title="Baseball" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <IoMdBaseball fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "mlb":
        return (
          <Tooltip title="MLB" {...styles.tooltip}>
            <m.img height={size ? +size.replace("rem", "") * 16 : 24} src={MLBLogo} {...styles.iconBox} />
          </Tooltip>
        );
      case "ncaa_baseball":
        return (
          <Tooltip title="NCAA Baseball" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <IoMdBaseball fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "minor_league_baseball":
        return (
          <Tooltip title="Minor League Baseball" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <IoMdBaseball fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "college_softball":
        return (
          <Tooltip title="College Softball" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <IoMdBaseball fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "football":
        return (
          <Tooltip title="Football" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaFootball color="saddlebrown" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "nfl":
        return (
          <Tooltip title="NFL" {...styles.tooltip}>
            <m.img height={size ? +size.replace("rem", "") * 16 : 24} src={NFLLogo} {...styles.iconBox} />
          </Tooltip>
        );
      case "ncaa_football":
        return (
          <Tooltip title="NCAA Football" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaFootball color="saddlebrown" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "xfl":
        return (
          <Tooltip title="XFL" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaFootball color="saddlebrown" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "basketball":
        return (
          <Tooltip title="Basketball" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaBasketball color="coral" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "nba":
        return (
          <Tooltip title="NBA" {...styles.tooltip}>
            <m.img height={size ? +size.replace("rem", "") * 16 : 24} src={NBALogo} {...styles.iconBox} />
          </Tooltip>
        );
      case "ncaa_basketball":
        return (
          <Tooltip title="NCAA Basketball" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaBasketball color="coral" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "ncaa_womens_basketball":
        return (
          <Tooltip title="NCAA Women's Basketball" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaBasketball color="coral" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "wnba":
        return (
          <Tooltip title="WNBA" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaBasketball color="coral" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "nba_dleague":
        return (
          <Tooltip title="G League" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaBasketball color="coral" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "hockey":
        return (
          <Tooltip title="Hockey" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsHockey fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "nhl":
        return (
          <Tooltip title="NHL" {...styles.tooltip}>
            <m.img height={size ? +size.replace("rem", "") * 16 : 24} src={NHLLogo} {...styles.iconBox} />
          </Tooltip>
        );
      case "ncaa_hockey":
        return (
          <Tooltip title="NCAA Hockey" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsHockey fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "womens_college_hockey":
        return (
          <Tooltip title="Women's College Hockey" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsHockey fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "minor_league_hockey":
        return (
          <Tooltip title="Minor League Hockey" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsHockey fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "national_womens_hockey":
        return (
          <Tooltip title="Women's National Hockey" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsHockey fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "soccer":
        return (
          <Tooltip title="Soccer" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <GiSoccerKick fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "mls":
        return (
          <Tooltip title="MLS" {...styles.tooltip}>
            <m.img height={size ? +size.replace("rem", "") * 16 : 24} src={MLSLogo} {...styles.iconBox} />
          </Tooltip>
        );
      case "ncaa_soccer":
        return (
          <Tooltip title="NCAA Soccer" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <GiSoccerKick fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "womens_college_soccer":
        return (
          <Tooltip title="Women's College Soccer" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <GiSoccerKick fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "european_soccer":
        return (
          <Tooltip title="Euro Soccer" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <GiSoccerKick fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "international_soccer":
        return (
          <Tooltip title="Intl. Soccer" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <GiSoccerKick fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "world_cup":
        return (
          <Tooltip title="FIFA World Cup" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <GiSoccerKick fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "united_soccer_league":
        return (
          <Tooltip title="United Soccer League" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <GiSoccerKick fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "national_womens_soccer":
        return (
          <Tooltip title="Women's National Soccer" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <GiSoccerKick fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "fighting":
        return (
          <Tooltip title="Fighting" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsKabaddi fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "boxing":
        return (
          <Tooltip title="Boxing" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <RiBoxingFill fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "mma":
        return (
          <Tooltip title="MMA" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <RiBoxingFill fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "wrestling":
        return (
          <Tooltip title="Wrestling" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsKabaddi fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "wwe":
        return (
          <Tooltip title="WWE" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsKabaddi fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "college_wrestling":
        return (
          <Tooltip title="College Wrestling" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsKabaddi fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "tennis":
        return (
          <Tooltip title="Tennis" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsTennis fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "college_tennis":
        return (
          <Tooltip title="College Tennis" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsTennis fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "womens_college_tennis":
        return (
          <Tooltip title="Women's College Tennis" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsTennis fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "lacrosse":
      case "major_league_lacrosse":
      case "womens_professional_league_lacrosse":
      case "college_lacrosse":
      case "womens_college_lacrosse":
        break;
      case "rugby":
        return (
          <Tooltip title="Rugby" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsRugby color="saddlebrown" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "major_league_rugby":
        return (
          <Tooltip title="Major League Rugby" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsRugby color="saddlebrown" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "concerts":
      case "concert":
        return (
          <Tooltip title="Concert" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaCirclePlay color="royalblue" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "music_festival":
        return (
          <Tooltip title="Music Festival" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdFestival color="royalblue" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "sports":
        return (
          <Tooltip title="Sports" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdLocalActivity fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "auto_racing":
        return (
          <Tooltip title="Auto Racing" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdMinorCrash fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "nascar":
        return (
          <Tooltip title="NASCAR" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdMinorCrash fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "nascar_sprintcup":
        return (
          <Tooltip title="NASCAR Sprint Cup" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdMinorCrash fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "nascar_nationwide":
        return (
          <Tooltip title="NASCAR Nationwide" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdMinorCrash fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "indycar":
        return (
          <Tooltip title="IndyCar" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdMinorCrash fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "f1":
        return (
          <Tooltip title="F1" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdMinorCrash fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "monster_truck":
        return (
          <Tooltip title="Monster Truck" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdMinorCrash fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "motocross":
        return (
          <Tooltip title="MotoCross" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdTwoWheeler fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "golf":
        return (
          <Tooltip title="Golf" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <IoGolf fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "pga":
        return (
          <Tooltip title="PGA" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <IoGolf fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "lpga":
        return (
          <Tooltip title="LPGA" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <IoGolf fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "college_golf":
        return (
          <Tooltip title="College Golf" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <IoGolf fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "womens_college_golf":
        return (
          <Tooltip title="Women's College Golf" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <IoGolf fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "animal_sports":
        break;
      case "horse_racing":
        return (
          <Tooltip title="Horse Racing" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <GiHorseshoe fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "rodeo":
        return (
          <Tooltip title="Rodeo" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <GiChargingBull fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "college_rodeo":
        return (
          <Tooltip title="College Rodeo" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <GiChargingBull fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "extreme_sports":
        break;
      case "olympic_sports":
        return (
          <Tooltip title="Olympic Sports" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <TbOlympics fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "esports":
        return (
          <Tooltip title="Esports" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsEsports fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "college_esports":
        return (
          <Tooltip title="College Esports" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsEsports fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "climbing":
        return (
          <Tooltip title="Climbing" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <GiMountainClimbing fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "volleyball":
        return (
          <Tooltip title="Volleyball" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaVolleyball fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "college_volleyball":
        return (
          <Tooltip title="College Volleyball" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaVolleyball fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "womens_college_volleyball":
        return (
          <Tooltip title="Women's College Volleyball" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaVolleyball fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "gymnastics":
        return (
          <Tooltip title="Gymnastics" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsGymnastics fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "college_gymnastics":
        return (
          <Tooltip title="College Gymnastics" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdSportsGymnastics fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "track_and_field":
        return (
          <Tooltip title="Track & Field" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaPersonRunning color="dodgerblue" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "college_track_and_field":
        return (
          <Tooltip title="College Track & Field" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaPersonRunning color="dodgerblue" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "swimming":
        return (
          <Tooltip title="Swimming" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdPool color="dodgerblue" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "college_swimming":
        return (
          <Tooltip title="College Swimming" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdPool color="dodgerblue" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "theater":
        return (
          <Tooltip title="Theater" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaMasksTheater color="lightseagreen" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "classical":
        return (
          <Tooltip title="Classical" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <GiViolin color="slateblue" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "classical_opera":
        return (
          <Tooltip title="Classical Opera" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <IoMusicalNotes color="slateblue" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "classical_vocal":
        return (
          <Tooltip title="Classical Vocal" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <IoMusicalNotes color="slateblue" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "classical_orchestral_instrumental":
        return (
          <Tooltip title="Classical Instrumental" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <GiViolin color="slateblue" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "cirque_du_soleil":
        return (
          <Tooltip title="Cirque du Soleil" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaMasksTheater color="lightseagreen" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "broadway_tickets_national":
        return (
          <Tooltip title="Broadway" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaMasksTheater color="lightseagreen" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "comedy":
        return (
          <Tooltip title="Comedy" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaFaceLaughSquint color="gold" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "family":
        return (
          <Tooltip title="Family" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdFamilyRestroom fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "dance_performance_tour":
        return (
          <Tooltip title="Dance" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdLocalActivity fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "film":
        return (
          <Tooltip title="Film" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdLocalMovies fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "literary":
        return (
          <Tooltip title="Literary" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <FaBookOpen color="chocolate" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "circus":
        return (
          <Tooltip title="Circus" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdFestival color="turqoise" fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "entertainment":
        return (
          <Tooltip title="Entertainment" {...styles.tooltip}>
            <Flexbox {...styles.iconBox}>
              <MdLocalActivity fontSize={size ?? "1.5rem"} />
            </Flexbox>
          </Tooltip>
        );
      case "addon":
      case "parking":
      case "club_passes":
      case "suite":
        break;
    }
  }
});

const styles = {
  iconBox: {
    component: m.div,
    drag: !isMobile,
    dragSnapToOrigin: !isMobile,
    dragTransition: { bounceDamping: 10, bounceStiffness: 500 },
    whileHover: { scale: 1.15 },
    whileTap: { scale: 0.75 },
  },
  tooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
    sx: { backdropFilter: "blur(0.5rem)", backgroundColor: "transparent" },
  },
};
