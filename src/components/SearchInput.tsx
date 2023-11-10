import { CloseRounded, Search } from "@mui/icons-material";
import { Box, IconButton, Input } from "@mui/joy";
import { motion } from "framer-motion";
import { useState } from "react";

export const SearchInput = (props: {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [term, setTerm] = useState("");

  return (
    <Box display="flex" gap={1}>
      <Input
        placeholder="Search..."
        startDecorator={<Search fontSize="small" />}
        slotProps={{
          input: {
            component: motion.input,
            whileFocus: { width: "17.5rem" },
            whileHover: { width: "17.5rem" },
            transition: { type: "spring", duration: 0.5 },
          },
        }}
        onChange={(e) => {
          props.setSearchTerm(e.target.value);
          setTerm(e.target.value);
        }}
        value={term}
        {...(term && {
          endDecorator: (
            <IconButton
              onClick={() => {
                props.setSearchTerm("");
                setTerm("");
              }}
            >
              <CloseRounded />
            </IconButton>
          ),
        })}
      />
    </Box>
  );
};
