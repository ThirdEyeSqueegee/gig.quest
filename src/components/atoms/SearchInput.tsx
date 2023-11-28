import { CloseRounded, Search } from "@mui/icons-material";
import { IconButton, Input, Typography } from "@mui/joy";
import { m } from "framer-motion";
import { memo, useRef } from "react";
import { isMobile } from "react-device-detect";
import { useHotkeys } from "react-hotkeys-hook";

import { useSearchStore } from "../../stores/useSearchStore.ts";
import { Flexbox } from "./Flexbox.tsx";

export const SearchInput = memo(function SearchInput() {
  const search = useSearchStore((state) => state);

  useHotkeys(
    "/",
    () => {
      inputRef.current?.focus();
    },
    {
      preventDefault: true,
    },
  );

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Input
      onChange={(e) => search.setSearchTerm(e.target.value)}
      placeholder="Search..."
      slotProps={{
        input: {
          component: m.input,
          ref: inputRef,
          transition: { duration: 0.5, type: "spring" },
          whileFocus: { width: "17.5rem" },
          whileHover: { width: "17.5rem" },
        },
      }}
      startDecorator={<Search fontSize="small" />}
      sx={{ backdropFilter: "blur(8px)", backgroundColor: "transparent" }}
      value={search.searchTerm}
      {...(!isMobile && {
        endDecorator: (
          <Flexbox alignItems="start" border={2} borderColor="neutral.outlinedBorder" borderRadius={5} height="1.5rem" width="1.5rem">
            <Typography fontSize="0.7rem" level="title-sm">
              /
            </Typography>
          </Flexbox>
        ),
      })}
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
