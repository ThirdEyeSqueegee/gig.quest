import {
  ArrowDownward,
  ArrowUpward,
  CloseRounded,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
} from "@mui/icons-material";
import { Box, IconButton, Option, Select, Typography, selectClasses } from "@mui/joy";
import { m } from "framer-motion";
import { useContext } from "react";
import { isMobile } from "react-device-detect";
import { PaginationContext } from "../contexts/PaginationContext";
import { EventTypeIcon } from "./EventTypeIcon";

export const Footer = (props: { eventCount?: number; page: number; setPage: React.Dispatch<React.SetStateAction<number>> }) => {
  const { props: pagination, setter: setPagination } = useContext(PaginationContext);

  return (
    <>
      <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" gap={2}>
        <Box display="flex" alignItems="center" gap={1}>
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
                setPagination({ ...pagination, filter: v });
                props.setPage(1);
              }}
              indicator={<KeyboardArrowDown />}
              {...(pagination.filter.length > 0 && {
                endDecorator: (
                  <IconButton
                    onMouseDown={event => {
                      event.stopPropagation();
                    }}
                    onClick={() => {
                      setPagination({ ...pagination, filter: [] });
                      props.setPage(1);
                    }}
                    sx={{ "--IconButton-size": "20px" }}
                  >
                    <CloseRounded fontSize="small" />
                  </IconButton>
                ),
                indicator: null,
              })}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
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
            </Select>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography level="body-sm" fontSize="0.75rem">
              Rows:
            </Typography>
            <Select
              size="sm"
              onChange={(e, v: number | null) => {
                setPagination({ ...pagination, rowsPerPage: v! });
                props.setPage(1);
              }}
              value={pagination.rowsPerPage}
              indicator={<KeyboardArrowDown />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
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
          <Box display="flex" alignItems="center" gap={1}>
            <Typography level="body-sm" fontSize="0.75rem">
              Range:
            </Typography>
            <Select
              size="sm"
              onChange={(e, v: string | null) => {
                setPagination({ ...pagination, range: v! });
                props.setPage(1);
              }}
              value={pagination.range}
              indicator={<KeyboardArrowDown />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              <Option value="5mi">5 mi</Option>
              <Option value="25mi">25 mi</Option>
              <Option value="50mi">50 mi</Option>
            </Select>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            variant="outlined"
            disabled={props.page === 1}
            onClick={() => {
              props.setPage(1);
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
            disabled={props.page === 1}
            onClick={() => {
              props.setPage(props.page - 1);
              if (isMobile) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            component={m.button}
            whileTap={{ scale: 0.8 }}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            variant="outlined"
            onClick={() => {
              props.setPage(props.page + 1);
              if (isMobile) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            component={m.button}
            whileTap={{ scale: 0.8 }}
          >
            <KeyboardArrowRight />
          </IconButton>
          {isMobile && (
            <Box display="flex" alignItems="center" gap={1}>
              <Typography level="body-sm" fontSize="0.75rem">
                Sort:
              </Typography>
              <Select
                size="sm"
                onChange={(e, v: string | null) => {
                  switch (v!) {
                    case "Date (asc.)":
                      setPagination({
                        ...pagination,
                        sortDate: true,
                        sortPopularity: undefined,
                        sortLowestPrice: undefined,
                        sortHighestPrice: undefined,
                        sortAvgPrice: undefined,
                      });
                      break;
                    case "Date (desc.)":
                      setPagination({
                        ...pagination,
                        sortDate: false,
                        sortPopularity: undefined,
                        sortLowestPrice: undefined,
                        sortHighestPrice: undefined,
                        sortAvgPrice: undefined,
                      });
                      break;
                    case "Popularity (asc.)":
                      setPagination({
                        ...pagination,
                        sortDate: undefined,
                        sortPopularity: true,
                        sortLowestPrice: undefined,
                        sortHighestPrice: undefined,
                        sortAvgPrice: undefined,
                      });
                      break;
                    case "Popularity (desc.)":
                      setPagination({
                        ...pagination,
                        sortDate: undefined,
                        sortPopularity: false,
                        sortLowestPrice: undefined,
                        sortHighestPrice: undefined,
                        sortAvgPrice: undefined,
                      });
                      break;
                    case "$ lo (asc.)":
                      setPagination({
                        ...pagination,
                        sortDate: undefined,
                        sortPopularity: undefined,
                        sortLowestPrice: true,
                        sortHighestPrice: undefined,
                        sortAvgPrice: undefined,
                      });
                      break;
                    case "$ lo (desc.)":
                      setPagination({
                        ...pagination,
                        sortDate: undefined,
                        sortPopularity: undefined,
                        sortLowestPrice: false,
                        sortHighestPrice: undefined,
                        sortAvgPrice: undefined,
                      });
                      break;
                    case "$ hi (asc.)":
                      setPagination({
                        ...pagination,
                        sortDate: undefined,
                        sortPopularity: undefined,
                        sortLowestPrice: undefined,
                        sortHighestPrice: true,
                        sortAvgPrice: undefined,
                      });
                      break;
                    case "$ hi (desc.)":
                      setPagination({
                        ...pagination,
                        sortDate: undefined,
                        sortPopularity: undefined,
                        sortLowestPrice: undefined,
                        sortHighestPrice: false,
                        sortAvgPrice: undefined,
                      });
                      break;
                    case "$ avg (asc.)":
                      setPagination({
                        ...pagination,
                        sortDate: undefined,
                        sortPopularity: undefined,
                        sortLowestPrice: undefined,
                        sortHighestPrice: undefined,
                        sortAvgPrice: true,
                      });
                      break;
                    case "$ avg (desc.)":
                      setPagination({
                        ...pagination,
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
                    transition: "0.2s",
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
        </Box>
      </Box>
      <Typography level="body-sm">
        Page {props.page} of {props.eventCount ? Math.ceil(props.eventCount / pagination.rowsPerPage) : "..."}
      </Typography>
    </>
  );
};
