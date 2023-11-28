import {
  ArrowDownward,
  ArrowUpward,
  CloseRounded,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  RestartAlt,
} from "@mui/icons-material";
import { IconButton, Option, Select, Slider, Typography, selectClasses } from "@mui/joy";
import { m } from "framer-motion";
import { memo, useState } from "react";
import { isMobile } from "react-device-detect";

import { useEvents } from "../../hooks/useEvents.ts";
import { usePaginationStore } from "../../stores/usePaginationStore.ts";
import { useSortingStore } from "../../stores/useSortingStore.ts";
import { useViewStore } from "../../stores/useViewStore.ts";
import { EventTypeIcon } from "../atoms/EventTypeIcon.tsx";
import { Flexbox } from "../atoms/Flexbox.tsx";

export const Footer = memo(function Footer() {
  const pagination = usePaginationStore((state) => state);
  const sorting = useSortingStore((state) => state);
  const tableView = useViewStore((state) => state.tableView);

  const { meta } = useEvents();
  const eventCount = meta?.total;

  const [sliderValue, setSliderValue] = useState(15);

  return (
    <Flexbox
      component={m.div}
      flexDirection="column"
      gap={isMobile ? 1 : 0}
      layout
      mb={1}
      mt={1}
      transition={{ duration: 0.25 }}
      width={isMobile ? "90%" : "auto"}
      {...(!isMobile && {
        bottom: 25,
        position: "sticky",
        px: 3,
        py: 0.5,
        sx: { backdropFilter: "blur(8px)", border: 1, borderColor: "neutral.outlinedBorder", borderRadius: 25, zIndex: "badge" },
      })}
    >
      <Flexbox flexWrap="wrap" gap={isMobile ? 1 : 2}>
        {/* --------------- Filter --------------- */}
        <Flexbox gap={1}>
          <Typography fontSize="0.75rem" level="body-sm">
            Filter:
          </Typography>
          <Select
            indicator={<KeyboardArrowDown />}
            multiple
            onChange={(e, v) => {
              if (v.includes("music_festival")) {
                pagination.setFilter(["music_festival"]);
                pagination.firstPage();
              } else {
                pagination.setFilter(v);
                pagination.firstPage();
              }
            }}
            renderValue={(selected) => (
              <Flexbox gap="0.25rem">
                {selected.map((selectedOption) => (
                  <EventTypeIcon eventType={selectedOption.value} key={selectedOption.id} />
                ))}
              </Flexbox>
            )}
            size="sm"
            sx={{
              [`& .${selectClasses.indicator}`]: {
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
                transition: "0.2s",
              },
              backgroundColor: "transparent",
            }}
            {...(pagination.filter.length > 0 && {
              endDecorator: (
                <IconButton
                  onClick={() => {
                    pagination.setFilter([]);
                    pagination.firstPage();
                  }}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  sx={{ "&:hover": { backgroundColor: "transparent" }, "--IconButton-size": "20px" }}
                >
                  <CloseRounded fontSize="small" />
                </IconButton>
              ),
              indicator: null,
            })}
            value={pagination.filter}
          >
            <Option value="concert">
              <EventTypeIcon eventType="concert" />
              Concert
            </Option>
            <Option value="comedy">
              <EventTypeIcon eventType="comedy" />
              Comedy
            </Option>
            <Option value="nba">
              <EventTypeIcon eventType="nba" />
              NBA
            </Option>
            <Option value="nfl">
              <EventTypeIcon eventType="nfl" />
              NFL
            </Option>
            <Option value="sports">
              <EventTypeIcon />
              Sports
            </Option>
            <Option value="theater">
              <EventTypeIcon eventType="theater" />
              Theater
            </Option>
            <Option value="music_festival">
              <EventTypeIcon eventType="music_festival" />
              Festival
            </Option>
          </Select>
        </Flexbox>
        {/* --------------- Rows --------------- */}
        <Flexbox gap={1}>
          <Typography fontSize="0.75rem" level="body-sm">
            Rows:
          </Typography>
          <Select
            indicator={<KeyboardArrowDown />}
            onChange={(e, v: null | number) => {
              pagination.setRowsPerPage(v!);
              pagination.firstPage();
            }}
            size="sm"
            sx={{
              [`& .${selectClasses.indicator}`]: {
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
                transition: "0.25s",
              },
              backgroundColor: "transparent",
            }}
            value={pagination.rowsPerPage}
          >
            <Option value={pagination.rowCountOptions[0]}>{pagination.rowCountOptions[0]}</Option>
            <Option value={pagination.rowCountOptions[1]}>{pagination.rowCountOptions[1]}</Option>
            <Option value={pagination.rowCountOptions[2]}>{pagination.rowCountOptions[2]}</Option>
          </Select>
        </Flexbox>
        {/* --------------- Range --------------- */}
        <Flexbox gap={1.5}>
          <Typography fontSize="0.75rem" level="body-sm">
            Range:
          </Typography>
          <Flexbox gap={0.5}>
            <Slider
              color="neutral"
              size="sm"
              valueLabelDisplay="auto"
              {...styles.rangeSlider}
              onChange={(e, v) => setSliderValue(+v)}
              onChangeCommitted={(e, v) => pagination.setRange(`${+v}mi`)}
              value={sliderValue}
            />
            {pagination.range !== "15mi" && (
              <IconButton
                onClick={() => {
                  setSliderValue(15);
                  pagination.setRange("15mi");
                }}
                size="sm"
                sx={{ "&:hover": { backgroundColor: "transparent" }, "--IconButton-size": "24px" }}
              >
                <RestartAlt fontSize="small" />
              </IconButton>
            )}
          </Flexbox>
        </Flexbox>
        {/* --------------- Sort --------------- */}
        {!tableView && (
          <Flexbox gap={1}>
            <Typography fontSize="0.75rem" level="body-sm">
              Sort:
            </Typography>
            <Select
              defaultValue="Date"
              indicator={<KeyboardArrowDown />}
              size="sm"
              slotProps={{
                listbox: {
                  sx: {
                    fontSize: "0.75rem",
                  },
                },
              }}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                  transition: "0.25s",
                },
                backgroundColor: "transparent",
              }}
            >
              <Option onClick={sorting.toggleSortDate} value="Date">
                Date{" "}
                {sorting.sortDate === undefined ?
                  null
                : sorting.sortDate ?
                  <ArrowUpward fontSize="small" />
                : <ArrowDownward fontSize="small" />}
              </Option>
              <Option onClick={sorting.toggleSortPopularity} value="Popularity">
                Popularity{" "}
                {sorting.sortPopularity === undefined ?
                  null
                : sorting.sortPopularity ?
                  <ArrowUpward fontSize="small" />
                : <ArrowDownward fontSize="small" />}
              </Option>
              <Option onClick={sorting.toggleSortLowestPrice} value="$ lo">
                $ lo{" "}
                {sorting.sortLowestPrice === undefined ?
                  null
                : sorting.sortLowestPrice ?
                  <ArrowUpward fontSize="small" />
                : <ArrowDownward fontSize="small" />}
              </Option>
              <Option onClick={sorting.toggleSortHighestPrice} value="$ hi">
                $ hi{" "}
                {sorting.sortHighestPrice === undefined ?
                  null
                : sorting.sortHighestPrice ?
                  <ArrowUpward fontSize="small" />
                : <ArrowDownward fontSize="small" />}
              </Option>
              <Option onClick={sorting.toggleSortAvgPrice} value="$ avg">
                $ avg{" "}
                {sorting.sortAvgPrice === undefined ?
                  null
                : sorting.sortAvgPrice ?
                  <ArrowUpward fontSize="small" />
                : <ArrowDownward fontSize="small" />}
              </Option>
            </Select>
          </Flexbox>
        )}
        {/* --------------- Pagination --------------- */}
        <Flexbox gap={1}>
          <IconButton
            component={m.button}
            disabled={pagination.page === 1}
            onClick={pagination.firstPage}
            variant="outlined"
            whileTap={{ scale: 0.8 }}
          >
            <KeyboardDoubleArrowLeft />
          </IconButton>
          <IconButton disabled={pagination.page === 1} onClick={pagination.prevPage} variant="outlined" {...styles.pageButton}>
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            disabled={pagination.page === Math.ceil(eventCount! / pagination.rowsPerPage)}
            onClick={pagination.nextPage}
            variant="outlined"
            {...styles.pageButton}
          >
            <KeyboardArrowRight />
          </IconButton>
          <IconButton
            disabled={pagination.page === Math.ceil(eventCount! / pagination.rowsPerPage)}
            onClick={() => pagination.setPage(Math.ceil(eventCount! / pagination.rowsPerPage))}
            variant="outlined"
            {...styles.pageButton}
          >
            <KeyboardDoubleArrowRight />
          </IconButton>
        </Flexbox>
      </Flexbox>
      <Typography level="body-sm">
        Page {pagination.page} of {eventCount ? Math.ceil(eventCount / pagination.rowsPerPage) : "..."}
      </Typography>
    </Flexbox>
  );
});

const styles = {
  pageButton: {
    component: m.button,
    whileTap: { scale: 0.8 },
  },
  rangeSlider: {
    defaultValue: 15,
    max: 50,
    sx: { minWidth: "8rem" },
  },
};
