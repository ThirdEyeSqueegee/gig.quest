import {
  CloseRounded,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  FormControl,
  FormLabel,
  IconButton,
  Option,
  Select,
  SelectStaticProps,
  Typography,
  selectClasses,
} from "@mui/joy";
import { useOrientation } from "@uidotdev/usehooks";
import { useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";

import { motion } from "framer-motion";

export default function Footer(props: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  range: string;
  setRange: React.Dispatch<React.SetStateAction<string>>;
  eventCount: number | undefined;
  filter: string[];
  setFilter: React.Dispatch<React.SetStateAction<string[]>>;
  rowOptions: number[];
}) {
  const action: SelectStaticProps["action"] = useRef(null);

  const orientation = useOrientation();

  useEffect(() => {}, [props.eventCount]);

  const rowCountLow = 1 + (props.page - 1) * props.rowsPerPage;
  let rowCountHigh = props.rowsPerPage + (props.page - 1) * props.rowsPerPage;
  rowCountHigh =
    props.eventCount && rowCountHigh > props.eventCount
      ? props.eventCount
      : rowCountHigh;

  const handleChangeRowsPerPage = (
    event: React.SyntheticEvent | null,
    newValue: number | null,
  ) => {
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    props.setRowsPerPage(newValue!);
    props.setPage(1);
  };

  const handleChangeRange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    props.setRange(newValue!);
    props.setPage(1);
  };

  const handleChangeFilter = (
    event: React.SyntheticEvent | null,
    newValue: Array<string> | null,
  ) => {
    props.setFilter(newValue!);
    props.setPage(1);
  };

  return (
    <Box>
      <Box
        alignItems="center"
        display="flex"
        flexWrap="wrap"
        gap={orientation.type.includes("portrait") ? 1 : 2}
        justifyContent="center"
      >
        <FormControl orientation="horizontal" size="sm">
          <FormLabel>Filter:</FormLabel>
          <Select
            action={action}
            defaultValue={[""]}
            multiple
            onChange={handleChangeFilter}
            size="sm"
            {...(!isMobile && {
              indicator: !isMobile && <KeyboardArrowDown fontSize="small" />,
              sx: {
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              },
            })}
            {...(props.filter.length > 0 && {
              endDecorator: (
                <IconButton
                  size="sm"
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    props.setFilter([]);
                    action.current?.focusVisible();
                  }}
                >
                  <CloseRounded fontSize="small" />
                </IconButton>
              ),
              indicator: null,
            })}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", gap: "0.25rem" }}>
                {selected.map((selectedOption, i) => (
                  <Chip key={i} size="sm" variant="soft">
                    {selectedOption.label}
                  </Chip>
                ))}
              </Box>
            )}
            value={props.filter}
          >
            <Option value="Concert">Concert</Option>
            <Option value="Comedy">Comedy</Option>
            <Option value="Sports">Sports</Option>
            <Option value="Theater">Theater</Option>
          </Select>
        </FormControl>
        <FormControl orientation="horizontal" size="sm">
          <FormLabel>Range:</FormLabel>
          <Select
            onChange={handleChangeRange}
            size="sm"
            value={props.range}
            {...(!isMobile && {
              indicator: !isMobile && <KeyboardArrowDown fontSize="small" />,
              sx: {
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              },
            })}
          >
            <Option value={"5mi"}>5 mi</Option>
            <Option value={"10mi"}>10 mi</Option>
            <Option value={"25mi"}>25 mi</Option>
            <Option value={"50mi"}>50 mi</Option>
          </Select>
        </FormControl>
        <FormControl orientation="horizontal" size="sm">
          <FormLabel>Rows:</FormLabel>
          <Select
            size="sm"
            onChange={handleChangeRowsPerPage}
            value={props.rowsPerPage}
            {...(!isMobile && {
              indicator: !isMobile && <KeyboardArrowDown fontSize="small" />,
              sx: {
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              },
            })}
          >
            <Option value={props.rowOptions[0]}>
              {props.rowOptions[0] === 10 ? "10" : "16"}
            </Option>
            <Option value={props.rowOptions[1]}>
              {props.rowOptions[1] === 25 ? "25" : "32"}
            </Option>
            <Option value={props.rowOptions[2]}>
              {props.rowOptions[2] === 50 ? "50" : "48"}
            </Option>
          </Select>
        </FormControl>
        <Box display="flex" gap={1}>
          <IconButton
            component={motion.button}
            whileTap={{ scale: 0.8 }}
            variant="outlined"
            disabled={props.page === 1}
            onClick={() => {
              if (isMobile) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              props.setPage(1);
            }}
          >
            <KeyboardDoubleArrowLeft />
          </IconButton>
          <IconButton
            component={motion.button}
            whileTap={{ scale: 0.8 }}
            variant="outlined"
            disabled={props.page === 1}
            onClick={() => {
              if (isMobile) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              props.setPage(props.page - 1);
            }}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            component={motion.button}
            whileTap={{ scale: 0.8 }}
            variant="outlined"
            onClick={() => {
              if (isMobile) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              props.setPage(props.page + 1);
            }}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
        <Typography level="body-sm">
          {`${
            props.eventCount === 0 || props.eventCount === undefined
              ? "..."
              : `${rowCountLow}-${rowCountHigh} of ${props.eventCount}`
          }`}
        </Typography>
      </Box>
    </Box>
  );
}
