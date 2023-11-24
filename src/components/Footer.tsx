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
import { Box, IconButton, Option, Select, Slider, Typography, selectClasses } from "@mui/joy";
import { m } from "framer-motion";
import { memo, useState } from "react";
import { isMobile } from "react-device-detect";

import { usePagination, useSorting, useView } from "../State.ts";
import { EventTypeIcon } from "./EventTypeIcon.tsx";

export const Footer = memo(function Footer(props: { eventCount?: number }) {
  const pagination = usePagination(state => state);
  const sorting = useSorting(state => state);
  const tableView = useView(state => state.tableView);

  const [sliderValue, setSliderValue] = useState(5);

  return (
    <Box
      alignItems="center"
      component={m.div}
      display="flex"
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
        sx: { backdropFilter: "blur(10px)", border: 1, borderColor: "neutral.outlinedBorder", borderRadius: 25, zIndex: "badge" },
      })}
    >
      <Box alignItems="center" display="flex" flexWrap="wrap" gap={isMobile ? 1 : 2} justifyContent="center">
        {/* --------------- Filter --------------- */}
        <Box alignItems="center" display="flex" gap={1}>
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
            renderValue={selected => (
              <Box display="flex" gap="0.25rem">
                {selected.map(selectedOption => (
                  <EventTypeIcon eventType={selectedOption.value} key={selectedOption.id} />
                ))}
              </Box>
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
                  onMouseDown={event => {
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
        </Box>
        {/* --------------- Rows --------------- */}
        <Box alignItems="center" display="flex" gap={1}>
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
        </Box>
        {/* --------------- Range --------------- */}
        <Box alignItems="center" display="flex" gap={1.5}>
          <Typography fontSize="0.75rem" level="body-sm">
            Range:
          </Typography>
          <Box alignItems="center" display="flex" gap={0.5}>
            <Slider
              color="neutral"
              size="sm"
              valueLabelDisplay="auto"
              {...styles.rangeSlider}
              onChange={(e, v) => setSliderValue(+v)}
              onChangeCommitted={(e, v) => pagination.setRange(`${+v}mi`)}
              value={sliderValue}
            />
            {pagination.range !== "5mi" && (
              <IconButton
                onClick={() => {
                  setSliderValue(5);
                  pagination.setRange("5mi");
                }}
                size="sm"
                sx={{ "&:hover": { backgroundColor: "transparent" }, "--IconButton-size": "24px" }}
              >
                <RestartAlt fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
        {/* --------------- Sort --------------- */}
        {!tableView && (
          <Box alignItems="center" display="flex" gap={1}>
            <Typography fontSize="0.75rem" level="body-sm">
              Sort:
            </Typography>
            <Select
              defaultValue="Date (asc.)"
              indicator={<KeyboardArrowDown />}
              onChange={(e, v: null | string) => {
                switch (v!) {
                  case "Date (asc.)":
                    sorting.toggleSortDate(true);
                    break;
                  case "Date (desc.)":
                    sorting.toggleSortDate(false);
                    break;
                  case "Popularity (asc.)":
                    sorting.toggleSortPopularity(true);
                    break;
                  case "Popularity (desc.)":
                    sorting.toggleSortPopularity(false);
                    break;
                  case "$ lo (asc.)":
                    sorting.toggleSortLowestPrice(true);
                    break;
                  case "$ lo (desc.)":
                    sorting.toggleSortLowestPrice(false);
                    break;
                  case "$ hi (asc.)":
                    sorting.toggleSortHighestPrice(true);
                    break;
                  case "$ hi (desc.)":
                    sorting.toggleSortHighestPrice(false);
                    break;
                  case "$ avg (asc.)":
                    sorting.toggleSortAvgPrice(true);
                    break;
                  case "$ avg (desc.)":
                    sorting.toggleSortAvgPrice(false);
                    break;
                }
              }}
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
              <Option value="Date (asc.)">
                Date <ArrowUpward fontSize="small" />
              </Option>
              <Option value="Date (desc.)">
                Date <ArrowDownward fontSize="small" />
              </Option>
              <Option value="Popularity (asc.)">
                Popularity <ArrowUpward fontSize="small" />
              </Option>
              <Option value="Popularity (desc.)">
                Popularity <ArrowDownward fontSize="small" />
              </Option>
              <Option value="$ lo (asc.)">
                $ lo <ArrowUpward fontSize="small" />
              </Option>
              <Option value="$ lo (desc.)">
                $ lo <ArrowDownward fontSize="small" />
              </Option>
              <Option value="$ hi (asc.)">
                $ hi <ArrowUpward fontSize="small" />
              </Option>
              <Option value="$ hi (desc.)">
                $ hi <ArrowDownward fontSize="small" />
              </Option>
              <Option value="$ avg (asc.)">
                $ avg <ArrowUpward fontSize="small" />
              </Option>
              <Option value="$ avg (desc.)">
                $ avg <ArrowDownward fontSize="small" />
              </Option>
            </Select>
          </Box>
        )}
        {/* --------------- Pagination --------------- */}
        <Box alignItems="center" display="flex" gap={1}>
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
            disabled={pagination.page === Math.ceil(props.eventCount! / pagination.rowsPerPage)}
            onClick={pagination.nextPage}
            variant="outlined"
            {...styles.pageButton}
          >
            <KeyboardArrowRight />
          </IconButton>
          <IconButton
            disabled={pagination.page === Math.ceil(props.eventCount! / pagination.rowsPerPage)}
            onClick={() => pagination.setPage(Math.ceil(props.eventCount! / pagination.rowsPerPage))}
            variant="outlined"
            {...styles.pageButton}
          >
            <KeyboardDoubleArrowRight />
          </IconButton>
        </Box>
      </Box>
      <Typography level="body-sm">
        Page {pagination.page} of {props.eventCount ? Math.ceil(props.eventCount / pagination.rowsPerPage) : "..."}
      </Typography>
    </Box>
  );
});

const styles = {
  pageButton: {
    component: m.button,
    whileTap: { scale: 0.8 },
  },
  rangeSlider: {
    defaultValue: 5,
    max: 50,
    sx: { minWidth: "8rem" },
  },
};
