import { IconButton, Input } from "@mui/joy";
import { m } from "framer-motion";
import { memo, useRef } from "react";
import { isMobile } from "react-device-detect";
import { useHotkeys } from "react-hotkeys-hook";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";

import { useSearchStore } from "../../stores/useSearchStore.ts";

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
      slotProps={{
        input: {
          component: m.input,
          ref: inputRef,
          transition: { duration: 0.5, type: "spring" },
          whileFocus: { width: isMobile ? "17.5rem" : "20rem" },
          whileHover: { width: isMobile ? "17.5rem" : "20rem" },
        },
      }}
      value={search.searchTerm}
      {...(search.searchTerm && {
        endDecorator: (
          <IconButton onClick={() => search.setSearchTerm("")} sx={styles.iconButton}>
            <MdClose />
          </IconButton>
        ),
      })}
      {...styles.searchInput}
    />
  );
});

const styles = {
  iconButton: {
    "&:hover, &:active": { backgroundColor: "transparent" },
  },
  searchInput: {
    placeholder: "Type / to search...",
    startDecorator: <FiSearch />,
    sx: {
      "--Input-paddingInline": "0.5rem",
      backdropFilter: "blur(0.5rem)",
      backgroundColor: "transparent",
      minWidth: isMobile ? "15rem" : "17.5rem",
    },
  },
};
