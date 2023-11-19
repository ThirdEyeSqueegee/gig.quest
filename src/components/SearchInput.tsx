import { CloseRounded, Search } from "@mui/icons-material";
import { Box, IconButton, Input } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";

export const SearchInput = memo(function SearchInput(props: { searchTerm: string; setSearchTerm: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <Box display="flex" gap={1}>
      <Input
        onChange={e => props.setSearchTerm(e.target.value)}
        placeholder="Search..."
        slotProps={{
          input: {
            component: m.input,
            transition: { duration: 0.5, type: "spring" },
            whileFocus: { width: "17.5rem" },
            whileHover: { width: "17.5rem" },
          },
        }}
        startDecorator={<Search fontSize="small" />}
        sx={{ backdropFilter: "blur(15px)", backgroundColor: "transparent" }}
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
});
