import {
  CloseRounded,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Option,
  Select,
  Typography,
  selectClasses,
} from "@mui/joy";
import { motion } from "framer-motion";
import { useContext } from "react";
import { PaginationContext } from "../contexts/PaginationContext";
import { EventTypeIcon } from "./EventTypeIcon";

export const Footer = (props: { eventCount?: number }) => {
  const { props: pagination, setter: setPagination } =
    useContext(PaginationContext);

  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography level="body-sm" fontSize="0.75rem">
              Filter:
            </Typography>
            <Select
              size="sm"
              multiple
              renderValue={(selected) => (
                <Box display="flex" gap="0.25rem">
                  {selected.map((selectedOption, i) => (
                    <EventTypeIcon key={i} eventType={selectedOption.value} />
                  ))}
                </Box>
              )}
              onChange={(e, v) => {
                setPagination({ ...pagination, page: 1, filter: v });
              }}
              indicator={<KeyboardArrowDown />}
              {...(pagination.filter.length > 0 && {
                endDecorator: (
                  <IconButton
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                    onClick={() => {
                      setPagination({ ...pagination, page: 1, filter: [] });
                    }}
                    sx={{ height: "0.5rem", width: "0.5rem" }}
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
                setPagination({ ...pagination, page: 1, rowsPerPage: v! });
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
              <Option value={pagination.rowCountOptions[0]}>
                {pagination.rowCountOptions[0] === 12 ? 12 : 20}
              </Option>
              <Option value={pagination.rowCountOptions[1]}>
                {pagination.rowCountOptions[1]}
              </Option>
              <Option value={pagination.rowCountOptions[2]}>
                {pagination.rowCountOptions[2]}
              </Option>
            </Select>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography level="body-sm" fontSize="0.75rem">
              Range:
            </Typography>
            <Select
              size="sm"
              onChange={(e, v: string | null) => {
                setPagination({ ...pagination, page: 1, range: v! });
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
              <Option value={"5mi"}>5 mi</Option>
              <Option value={"25mi"}>25 mi</Option>
              <Option value={"50mi"}>50 mi</Option>
            </Select>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            variant="outlined"
            disabled={pagination.page === 1}
            onClick={() => {
              setPagination({ ...pagination, page: 1 });
            }}
            component={motion.button}
            whileTap={{ scale: 0.8 }}
          >
            <KeyboardDoubleArrowLeft />
          </IconButton>
          <IconButton
            variant="outlined"
            disabled={pagination.page === 1}
            onClick={() =>
              setPagination({ ...pagination, page: pagination.page - 1 })
            }
            component={motion.button}
            whileTap={{ scale: 0.8 }}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            variant="outlined"
            onClick={() =>
              setPagination({ ...pagination, page: pagination.page + 1 })
            }
            component={motion.button}
            whileTap={{ scale: 0.8 }}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex">
        <Typography level="body-sm">
          Page {pagination.page} of{" "}
          {props.eventCount
            ? Math.ceil(props.eventCount / pagination.rowsPerPage)
            : "..."}
        </Typography>
      </Box>
    </>
  );
};
