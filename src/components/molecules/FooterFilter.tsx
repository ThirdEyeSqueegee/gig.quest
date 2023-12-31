import { IconButton, Option, Select, Typography, selectClasses } from "@mui/joy";
import { memo } from "react";
import { FiChevronDown } from "react-icons/fi";
import { MdClose } from "react-icons/md";

import type { SGEventType } from "../../api/interfaces/SeatGeek.ts";

import { usePaginationStore } from "../../stores/usePaginationStore.ts";
import { useSearchStore } from "../../stores/useSearchStore.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";
import { EventTypeIcon } from "./EventTypeIcon.tsx";

export const FooterFilter = memo(function FooterFilter() {
  const filter = useSearchStore((state) => state.filter);
  const setFilter = useSearchStore((state) => state.setFilter);
  const firstPage = usePaginationStore((state) => state.firstPage);

  return (
    <Flexbox gap={1}>
      <Typography {...styles.typography}>Filter:</Typography>
      <Select
        onChange={(e, v) => {
          setFilter(v);
          firstPage();
        }}
        renderValue={(selected) => (
          <Flexbox gap={0.5}>
            {selected.map((selectedOption) => (
              <EventTypeIcon eventType={selectedOption.value as SGEventType} key={selectedOption.id} size="1rem" />
            ))}
          </Flexbox>
        )}
        value={filter}
        {...styles.select}
        {...(filter.length > 0 && {
          endDecorator: (
            <IconButton
              aria-label="Reset filter"
              onClick={() => {
                setFilter([]);
                firstPage();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              size="sm"
              sx={{ "--IconButton-size": "1rem", "&:hover, &:active": { backgroundColor: "transparent" } }}
            >
              <MdClose />
            </IconButton>
          ),
          indicator: null,
        })}
      >
        <Option value="concert">
          <EventTypeIcon eventType="concert" size="1rem" />
          Concert
        </Option>
        <Option value="comedy">
          <EventTypeIcon eventType="comedy" size="1rem" />
          Comedy
        </Option>
        <Option value="theater">
          <EventTypeIcon eventType="theater" size="1rem" />
          Theater
        </Option>
        <Option value="music_festival">
          <EventTypeIcon eventType="music_festival" size="1rem" />
          Festival
        </Option>
        <Option value="nba">
          <EventTypeIcon eventType="nba" size="1rem" />
          NBA
        </Option>
        <Option value="nfl">
          <EventTypeIcon eventType="nfl" size="1rem" />
          NFL
        </Option>
        <Option value="nhl">
          <EventTypeIcon eventType="nhl" size="1rem" />
          NHL
        </Option>
        <Option value="mlb">
          <EventTypeIcon eventType="mlb" size="1rem" />
          MLB
        </Option>
        <Option value="sports">
          <EventTypeIcon eventType="sports" size="1rem" />
          Other Sports
        </Option>
      </Select>
    </Flexbox>
  );
});

const styles = {
  select: {
    indicator: <FiChevronDown />,
    multiple: true,
    size: "sm",
    sx: {
      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.25)" },
      [`& .${selectClasses.indicator}`]: {
        [`&.${selectClasses.expanded}`]: { transform: "rotate(-180deg)" },
        transition: "0.25s",
      },
      backgroundColor: "transparent",
    },
  },
  typography: {
    level: "body-xs",
    sx: { userSelect: "none" },
  },
} as const;
