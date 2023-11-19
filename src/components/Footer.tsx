import {
  ArrowDownward,
  ArrowUpward,
  CloseRounded,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  RestartAlt,
} from "@mui/icons-material";
import { Box, IconButton, Option, Select, Slider, Typography, selectClasses } from "@mui/joy";
import { m } from "framer-motion";
import { memo, useContext, useState } from "react";
import { isMobile } from "react-device-detect";

import { PaginationContext } from "../contexts/PaginationContext.ts";
import { SortingContext } from "../contexts/SortingContext.ts";
import { ViewContext } from "../contexts/ViewContext.ts";
import { EventTypeIcon } from "./EventTypeIcon.tsx";

export const Footer = memo(function Footer(props: { eventCount?: number }) {
  const { props: pagination, setter: setPagination } = useContext(PaginationContext);
  const { props: sorting, setter: setSorting } = useContext(SortingContext);
  const { state: tableView } = useContext(ViewContext);

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
      transition={{ duration: 0.25 }}
      width={isMobile ? "90%" : "auto"}
      {...(!isMobile && {
        bottom: 25,
        position: "sticky",
        px: 3,
        py: 0.5,
        sx: { backdropFilter: "blur(15px)", border: 1, borderColor: "neutral.outlinedBorder", borderRadius: 25, zIndex: "badge" },
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
                setPagination({ ...pagination, filter: ["music_festival"], page: 1 });
              } else {
                setPagination({ ...pagination, filter: v, page: 1 });
              }
            }}
            renderValue={selected => (
              <Box display="flex" gap="0.25rem">
                {selected.map((selectedOption, i) => (
                  <EventTypeIcon eventType={selectedOption.value} key={i} />
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
                    setPagination({ ...pagination, filter: [], page: 1 });
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
              setPagination({ ...pagination, page: 1, rowsPerPage: v! });
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
              onChangeCommitted={(e, v) => setPagination({ ...pagination, page: 1, range: `${+v}mi` })}
              value={sliderValue}
            />
            {pagination.range !== "5mi" && (
              <IconButton
                onClick={() => {
                  setSliderValue(5);
                  setPagination({ ...pagination, page: 1, range: "5mi" });
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
                    setSorting({
                      ...sorting,
                      sortAvgPrice: undefined,
                      sortDate: true,
                      sortHighestPrice: undefined,
                      sortLowestPrice: undefined,
                      sortPopularity: undefined,
                    });
                    break;
                  case "Date (desc.)":
                    setSorting({
                      ...sorting,
                      sortAvgPrice: undefined,
                      sortDate: false,
                      sortHighestPrice: undefined,
                      sortLowestPrice: undefined,
                      sortPopularity: undefined,
                    });
                    break;
                  case "Popularity (asc.)":
                    setSorting({
                      ...sorting,
                      sortAvgPrice: undefined,
                      sortDate: undefined,
                      sortHighestPrice: undefined,
                      sortLowestPrice: undefined,
                      sortPopularity: true,
                    });
                    break;
                  case "Popularity (desc.)":
                    setSorting({
                      ...sorting,
                      sortAvgPrice: undefined,
                      sortDate: undefined,
                      sortHighestPrice: undefined,
                      sortLowestPrice: undefined,
                      sortPopularity: false,
                    });
                    break;
                  case "$ lo (asc.)":
                    setSorting({
                      ...sorting,
                      sortAvgPrice: undefined,
                      sortDate: undefined,
                      sortHighestPrice: undefined,
                      sortLowestPrice: true,
                      sortPopularity: undefined,
                    });
                    break;
                  case "$ lo (desc.)":
                    setSorting({
                      ...sorting,
                      sortAvgPrice: undefined,
                      sortDate: undefined,
                      sortHighestPrice: undefined,
                      sortLowestPrice: false,
                      sortPopularity: undefined,
                    });
                    break;
                  case "$ hi (asc.)":
                    setSorting({
                      ...sorting,
                      sortAvgPrice: undefined,
                      sortDate: undefined,
                      sortHighestPrice: true,
                      sortLowestPrice: undefined,
                      sortPopularity: undefined,
                    });
                    break;
                  case "$ hi (desc.)":
                    setSorting({
                      ...sorting,
                      sortAvgPrice: undefined,
                      sortDate: undefined,
                      sortHighestPrice: false,
                      sortLowestPrice: undefined,
                      sortPopularity: undefined,
                    });
                    break;
                  case "$ avg (asc.)":
                    setSorting({
                      ...sorting,
                      sortAvgPrice: true,
                      sortDate: undefined,
                      sortHighestPrice: undefined,
                      sortLowestPrice: undefined,
                      sortPopularity: undefined,
                    });
                    break;
                  case "$ avg (desc.)":
                    setSorting({
                      ...sorting,
                      sortAvgPrice: false,
                      sortDate: undefined,
                      sortHighestPrice: undefined,
                      sortLowestPrice: undefined,
                      sortPopularity: undefined,
                    });
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
            onClick={() => setPagination({ ...pagination, page: 1 })}
            variant="outlined"
            whileTap={{ scale: 0.8 }}
          >
            <KeyboardDoubleArrowLeft />
          </IconButton>
          <IconButton
            disabled={pagination.page === 1}
            onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
            variant="outlined"
            {...styles.pageButton}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })} variant="outlined" {...styles.pageButton}>
            <KeyboardArrowRight />
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
