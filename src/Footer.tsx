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
} from "@mui/joy";
import { useOrientation } from "@uidotdev/usehooks";

export default function Footer(props: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  range: string;
  setRange: React.Dispatch<React.SetStateAction<string>>;
  justify: string;
}) {
  const orientation = useOrientation();

  const handleChangePage = (newPage: number) => {
    props.setPage(newPage);
  };

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
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: orientation.type.includes("portrait") ? 1 : 2,
        justifyContent: props.justify,
      }}
    >
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
      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton
          variant="outlined"
          disabled={props.page === 1}
          onClick={() => handleChangePage(1)}
          sx={{ mr: orientation.type.includes("portrait") ? 1 : 2 }}
        >
          <KeyboardDoubleArrowLeft />
        </IconButton>
        <IconButton
          variant="outlined"
          disabled={props.page === 1}
          onClick={() => handleChangePage(props.page - 1)}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          variant="outlined"
          onClick={() => handleChangePage(props.page + 1)}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    </Box>
  );
}
