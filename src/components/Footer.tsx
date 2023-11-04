import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import { useOrientation } from "@uidotdev/usehooks";

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
}) {
  const orientation = useOrientation();

  const handleChangeRowsPerPage = (
    event: React.SyntheticEvent | null,
    newValue: number | null
  ) => {
    props.setRowsPerPage(newValue!);
    props.setPage(1);
  };

  const handleChangeRange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    props.setRange(newValue!);
    props.setPage(1);
  };

  const handleChangeFilter = (
    event: React.SyntheticEvent | null,
    newValue: Array<string> | null
  ) => {
    props.setFilter(newValue!);
    props.setPage(1);
  };

  return (
    <Box mt={1}>
      <Box
        alignItems="center"
        display="flex"
        flexWrap={orientation.type.includes("portrait") ? "wrap" : "inherit"}
        gap={orientation.type.includes("portrait") ? 1 : 2}
        justifyContent="center"
      >
        <FormControl orientation="horizontal" size="sm">
          <FormLabel>Filter:</FormLabel>
          <Select defaultValue={["All"]} multiple onChange={handleChangeFilter}>
            <Option value="All">All</Option>
            <Option value="Concert">Concert</Option>
            <Option value="Comedy">Comedy</Option>
            <Option value="Sports">Sports</Option>
            <Option value="Theater">Theater</Option>
          </Select>
        </FormControl>
        <FormControl orientation="horizontal" size="sm">
          <FormLabel>Range:</FormLabel>
          <Select onChange={handleChangeRange} value={props.range}>
            <Option value={"5mi"}>5 mi</Option>
            <Option value={"10mi"}>10 mi</Option>
            <Option value={"25mi"}>25 mi</Option>
            <Option value={"50mi"}>50 mi</Option>
          </Select>
        </FormControl>
        <FormControl orientation="horizontal" size="sm">
          <FormLabel>Rows:</FormLabel>
          <Select onChange={handleChangeRowsPerPage} value={props.rowsPerPage}>
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={30}>30</Option>
          </Select>
        </FormControl>
        <Box display="flex" gap={1}>
          <IconButton
            variant="outlined"
            disabled={props.page === 1}
            onClick={() => props.setPage(1)}
          >
            <KeyboardDoubleArrowLeft />
          </IconButton>
          <IconButton
            variant="outlined"
            disabled={props.page === 1}
            onClick={() => props.setPage(props.page - 1)}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            variant="outlined"
            onClick={() => props.setPage(props.page + 1)}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
        <Typography level="body-sm">
          {props.eventCount
            ? `${1 + (props.page - 1) * props.rowsPerPage}-${
                props.rowsPerPage + (props.page - 1) * props.rowsPerPage
              } of ${props.eventCount}`
            : "Fetching data..."}
        </Typography>
      </Box>
    </Box>
  );
}
