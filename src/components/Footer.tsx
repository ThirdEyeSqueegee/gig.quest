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
import { useContext, useState } from "react";
import { isMobile } from "react-device-detect";
import { PaginationContext } from "../contexts/PaginationContext";
import { SortingContext } from "../contexts/SortingContext";
import { ViewContext } from "../contexts/ViewContext";
import { EventTypeIcon } from "./EventTypeIcon";

export const Footer = (props: { eventCount?: number }) => {
  const { props: pagination, setter: setPagination } = useContext(PaginationContext);
  const { props: sorting, setter: setSorting } = useContext(SortingContext);
  const { state: tableView } = useContext(ViewContext);

  const [sliderValue, setSliderValue] = useState(5);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={0}>
      <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" gap={2}>
        {/* --------------- Filter --------------- */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography level="body-sm" fontSize="0.75rem">
            Filter:
          </Typography>
          <Select
            size="sm"
            multiple
            renderValue={selected => (
              <Box display="flex" gap="0.25rem">
                {selected.map((selectedOption, i) => (
                  <EventTypeIcon key={i} eventType={selectedOption.value} />
                ))}
              </Box>
            )}
            onChange={(e, v) => {
              if (v.includes("music_festival")) {
                setPagination({ ...pagination, filter: ["music_festival"], page: 1 });
              } else {
                setPagination({ ...pagination, filter: v, page: 1 });
              }
            }}
            indicator={<KeyboardArrowDown />}
            sx={{
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
            {...(pagination.filter.length > 0 && {
              endDecorator: (
                <IconButton
                  onMouseDown={event => {
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    setPagination({ ...pagination, filter: [], page: 1 });
                  }}
                  sx={{ "--IconButton-size": "20px", "&:hover": { backgroundColor: "transparent" } }}
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
        <Box display="flex" alignItems="center" gap={1}>
          <Typography level="body-sm" fontSize="0.75rem">
            Rows:
          </Typography>
          <Select
            size="sm"
            onChange={(e, v: number | null) => {
              setPagination({ ...pagination, rowsPerPage: v!, page: 1 });
            }}
            value={pagination.rowsPerPage}
            indicator={<KeyboardArrowDown />}
            sx={{
              [`& .${selectClasses.indicator}`]: {
                transition: "0.25s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
          >
            <Option value={pagination.rowCountOptions[0]}>{pagination.rowCountOptions[0]}</Option>
            <Option value={pagination.rowCountOptions[1]}>{pagination.rowCountOptions[1]}</Option>
            <Option value={pagination.rowCountOptions[2]}>{pagination.rowCountOptions[2]}</Option>
            <Option value={pagination.rowCountOptions[3]}>{pagination.rowCountOptions[3]}</Option>
          </Select>
        </Box>
        {/* --------------- Range --------------- */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <Typography level="body-sm" fontSize="0.75rem">
            Range:
          </Typography>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Slider
              size="sm"
              color="neutral"
              valueLabelDisplay="auto"
              {...styles.rangeSlider}
              value={sliderValue}
              onChange={(e, v) => setSliderValue(+v)}
              onChangeCommitted={(e, v) => setPagination({ ...pagination, range: `${+v}mi`, page: 1 })}
            />
            <IconButton
              size="sm"
              onClick={() => {
                setSliderValue(5);
                setPagination({ ...pagination, range: "5mi", page: 1 });
              }}
              sx={{ "--IconButton-size": "24px", "&:hover": { backgroundColor: "transparent" } }}
            >
              <RestartAlt fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        {/* --------------- Sort --------------- */}
        {!tableView && (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography level="body-sm" fontSize="0.75rem">
              Sort:
            </Typography>
            <Select
              size="sm"
              onChange={(e, v: string | null) => {
                switch (v!) {
                  case "Date (asc.)":
                    setSorting({
                      ...sorting,
                      sortDate: true,
                      sortPopularity: undefined,
                      sortLowestPrice: undefined,
                      sortHighestPrice: undefined,
                      sortAvgPrice: undefined,
                    });
                    break;
                  case "Date (desc.)":
                    setSorting({
                      ...sorting,
                      sortDate: false,
                      sortPopularity: undefined,
                      sortLowestPrice: undefined,
                      sortHighestPrice: undefined,
                      sortAvgPrice: undefined,
                    });
                    break;
                  case "Popularity (asc.)":
                    setSorting({
                      ...sorting,
                      sortDate: undefined,
                      sortPopularity: true,
                      sortLowestPrice: undefined,
                      sortHighestPrice: undefined,
                      sortAvgPrice: undefined,
                    });
                    break;
                  case "Popularity (desc.)":
                    setSorting({
                      ...sorting,
                      sortDate: undefined,
                      sortPopularity: false,
                      sortLowestPrice: undefined,
                      sortHighestPrice: undefined,
                      sortAvgPrice: undefined,
                    });
                    break;
                  case "$ lo (asc.)":
                    setSorting({
                      ...sorting,
                      sortDate: undefined,
                      sortPopularity: undefined,
                      sortLowestPrice: true,
                      sortHighestPrice: undefined,
                      sortAvgPrice: undefined,
                    });
                    break;
                  case "$ lo (desc.)":
                    setSorting({
                      ...sorting,
                      sortDate: undefined,
                      sortPopularity: undefined,
                      sortLowestPrice: false,
                      sortHighestPrice: undefined,
                      sortAvgPrice: undefined,
                    });
                    break;
                  case "$ hi (asc.)":
                    setSorting({
                      ...sorting,
                      sortDate: undefined,
                      sortPopularity: undefined,
                      sortLowestPrice: undefined,
                      sortHighestPrice: true,
                      sortAvgPrice: undefined,
                    });
                    break;
                  case "$ hi (desc.)":
                    setSorting({
                      ...sorting,
                      sortDate: undefined,
                      sortPopularity: undefined,
                      sortLowestPrice: undefined,
                      sortHighestPrice: false,
                      sortAvgPrice: undefined,
                    });
                    break;
                  case "$ avg (asc.)":
                    setSorting({
                      ...sorting,
                      sortDate: undefined,
                      sortPopularity: undefined,
                      sortLowestPrice: undefined,
                      sortHighestPrice: undefined,
                      sortAvgPrice: true,
                    });
                    break;
                  case "$ avg (desc.)":
                    setSorting({
                      ...sorting,
                      sortDate: undefined,
                      sortPopularity: undefined,
                      sortLowestPrice: undefined,
                      sortHighestPrice: undefined,
                      sortAvgPrice: false,
                    });
                    break;
                }
              }}
              defaultValue="Date (asc.)"
              indicator={<KeyboardArrowDown />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.25s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
              slotProps={{
                listbox: {
                  sx: {
                    fontSize: "0.75rem",
                  },
                },
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
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            variant="outlined"
            disabled={pagination.page === 1}
            onClick={() => {
              setPagination({ ...pagination, page: 1 });
              if (isMobile) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            component={m.button}
            whileTap={{ scale: 0.8 }}
          >
            <KeyboardDoubleArrowLeft />
          </IconButton>
          <IconButton
            variant="outlined"
            disabled={pagination.page === 1}
            onClick={() => {
              setPagination({ ...pagination, page: pagination.page - 1 });
              if (isMobile) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            {...styles.pageButton}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            variant="outlined"
            onClick={() => {
              setPagination({ ...pagination, page: pagination.page + 1 });
              if (isMobile) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            {...styles.pageButton}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>
      <Typography level="body-sm">
        Page {pagination.page} of {props.eventCount ? Math.ceil(props.eventCount / pagination.rowsPerPage) : "..."}
      </Typography>
    </Box>
  );
};

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
