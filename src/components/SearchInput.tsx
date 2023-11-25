import { CloseRounded, Search } from "@mui/icons-material";
import { IconButton, Input } from "@mui/joy";
import { m } from "framer-motion";
import { memo } from "react";

import { useSearch } from "../State.ts";

export const SearchInput = memo(function SearchInput() {
  const search = useSearch(state => state);

  return (
    <Input
      onChange={e => search.setSearchTerm(e.target.value)}
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
      sx={{ backdropFilter: "blur(10px)", backgroundColor: "transparent" }}
      value={search.searchTerm}
      {...(search.searchTerm && {
        endDecorator: (
          <IconButton onClick={() => search.setSearchTerm("")}>
            <CloseRounded />
          </IconButton>
        ),
      })}
    />
  );
});
