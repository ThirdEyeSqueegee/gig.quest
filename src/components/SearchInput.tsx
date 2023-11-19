import { CloseRounded, Search } from "@mui/icons-material";
import { Box, IconButton, Input } from "@mui/joy";
import { m } from "framer-motion";

export const SearchInput = (props: { searchTerm: string; setSearchTerm: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <Box display="flex" gap={1}>
      <Input
        placeholder="Search..."
        startDecorator={<Search fontSize="small" />}
        slotProps={{
          input: {
            component: m.input,
            whileFocus: { width: "17.5rem" },
            whileHover: { width: "17.5rem" },
            transition: { type: "spring", duration: 0.5 },
          },
        }}
        sx={{ backgroundColor: "transparent", backdropFilter: "blur(15px)" }}
        onChange={e => props.setSearchTerm(e.target.value)}
        value={props.searchTerm}
        {...(props.searchTerm && {
          endDecorator: (
            <IconButton onClick={() => props.setSearchTerm("")}>
              <CloseRounded />
            </IconButton>
          ),
        })}
      />
    </Box>
  );
};
