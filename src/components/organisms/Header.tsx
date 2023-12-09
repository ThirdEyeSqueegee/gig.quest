import { IconButton, Link, Switch, Tooltip, Typography } from "@mui/joy";
import { useWindowSize } from "@uidotdev/usehooks";
import { m, scroll } from "framer-motion";
import { memo, useState } from "react";
import { isMobile } from "react-device-detect";
import { FiGithub, FiGrid } from "react-icons/fi";
import { MdLocationOn, MdTableRows } from "react-icons/md";
import TypeIt from "typeit-react";

import { lerp } from "../../Utilities.ts";
import { useSeatGeekEvents } from "../../hooks/useSeatGeekEvents.ts";
import { useLocationStore } from "../../stores/useLocationStore.ts";
import { usePaginationStore } from "../../stores/usePaginationStore.ts";
import { useViewStore } from "../../stores/useViewStore.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";
import { HelpButton } from "../molecules/HelpButton.tsx";
import { SearchInput } from "../molecules/SearchInput.tsx";

export const Header = memo(function Header() {
  const range = usePaginationStore((state) => state.range);
  const firstPage = usePaginationStore((state) => state.firstPage);
  const view = useViewStore((state) => state);
  const location = useLocationStore((state) => state);

  const { meta } = useSeatGeekEvents();
  const geolocation = meta?.geolocation;

  const { height, width } = useWindowSize();
  const isWidescreen = width && height ? width / height > 4 / 3 : undefined;

  const [headerTextHeight, setHeaderTextHeight] = useState(2.5);
  const [locationIconHeight, setLocationIconHeight] = useState(1.75);
  const [locationHeight, setLocationHeight] = useState(0.875);
  const [searchMarginRight, setSearchMarginRight] = useState(2.5);

  scroll((progress) => {
    setHeaderTextHeight(lerp(2.5, 1.5, progress));
    setLocationIconHeight(lerp(1.75, 1, progress));
    setLocationHeight(lerp(0.875, 0.6, progress));
    setSearchMarginRight(lerp(2.5, 7, progress));
  });

  const handleSetLocation = () => {
    if (!location.location) {
      navigator.geolocation.getCurrentPosition(
        (p: GeolocationPosition) => {
          location.setLocation({ lat: p.coords.latitude, lon: p.coords.longitude });
        },
        null,
        {
          enableHighAccuracy: true,
        },
      );
    }
  };

  return (
    <Flexbox borderBottom={1} borderColor="neutral.outlinedBorder" flexDirection="column" pb={isMobile ? 0 : 1} width={1}>
      <IconButton aria-label="GitHub repo button" sx={styles.githubButton}>
        <FiGithub fontSize="1.5rem" />
        <Link aria-label="GitHub repo link" href="https://github.com/ThirdEyeSqueegee/gig.quest" overlay />
      </IconButton>
      <HelpButton />
      <Flexbox flexDirection="column" gap={isMobile ? 1 : 0}>
        <Typography {...styles.headerText} fontSize={`${headerTextHeight}rem`}>
          <TypeIt options={{ cursor: false }}>gig.quest</TypeIt>
        </Typography>
        <Flexbox>
          <IconButton aria-label="Location button" onClick={handleSetLocation} {...styles.iconButton}>
            <Tooltip open={!location.location} {...styles.locationTooltip}>
              <Flexbox {...styles.locationIconBox}>
                <MdLocationOn color="red" fontSize={`${locationIconHeight}rem`} />
              </Flexbox>
            </Tooltip>
          </IconButton>
          <Typography fontSize={`${locationHeight}rem`} sx={{ userSelect: "none" }}>
            {`${
              geolocation ? geolocation.display_name
              : range === "51mi" ? "Everywhere"
              : "..."
            } (${range === "51mi" ? "\u221E mi" : range})`}
          </Typography>
        </Flexbox>
      </Flexbox>
      <Flexbox justifyContent={isWidescreen ? "end" : "center"} {...styles.searchFlex} {...(!isMobile && { mr: searchMarginRight, mt: -4.7 })}>
        <SearchInput />
        {!isMobile && (
          <Tooltip title={`Switch to ${view.tableView ? "grid" : "table"} view`} {...styles.switchTooltip}>
            <Switch
              checked={!view.tableView}
              onChange={() => {
                view.toggleGridView();
                firstPage();
              }}
              {...styles.viewSwitch}
            />
          </Tooltip>
        )}
      </Flexbox>
    </Flexbox>
  );
});

const styles = {
  githubButton: {
    "&:hover, &:active": { backgroundColor: "transparent" },
    position: "absolute",
    right: "0.5rem",
    top: "0.5rem",
  },
  headerText: {
    component: m.span,
    fontFamily: "Fira Code Variable",
    sx: { userSelect: "none" },
    whileHover: { rotate: [0, 3, -3, 3, -3, 0], transition: { duration: 0.75 } },
  },
  iconButton: {
    sx: { "--IconButton-size": "1rem", "&:hover, &:active": { backgroundColor: "transparent" }, px: 0 },
  },
  locationIconBox: {
    component: m.div,
    drag: !isMobile,
    dragSnapToOrigin: !isMobile,
    dragTransition: { bounceDamping: 10, bounceStiffness: 500 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  },
  locationTooltip: {
    animate: { opacity: [0, 1], transition: { delay: 0.5 } },
    component: m.div,
    placement: "bottom",
    size: "lg",
    sx: { backdropFilter: "blur(0.5rem)", backgroundColor: "transparent", borderRadius: "2rem", userSelect: "none" },
    title: "Click/tap location icon to allow precise location",
  },
  searchFlex: {
    alignSelf: isMobile ? "center" : "end",
    gap: 2,
    ...(isMobile && {
      my: 1,
    }),
  },
  switchTooltip: {
    animate: { opacity: [0, 1] },
    component: m.div,
    sx: { backdropFilter: "blur(0.5rem)", backgroundColor: "transparent", borderRadius: "2rem", userSelect: "none" },
  },
  viewSwitch: {
    endDecorator: <FiGrid fontSize="small" />,
    size: "lg",
    slotProps: { thumb: { style: { transition: "0.25s" } } },
    startDecorator: <MdTableRows fontSize="small" />,
    variant: "outlined",
  },
} as const;
