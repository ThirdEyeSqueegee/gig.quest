import { CloseRounded, Search } from "@mui/icons-material";
import { Box, IconButton, Input } from "@mui/joy";
import { useWindowSize } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { useState } from "react";

export const SearchInput = (props: {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [term, setTerm] = useState("");
  const { width, height } = useWindowSize();

  return (
    <Box display="flex" gap={1}>
      <Input
        placeholder="Search..."
        startDecorator={<Search fontSize="small" />}
        slotProps={{
          input: {
            component: motion.input,
            whileFocus: { width: width! > height! ? "15rem" : "12.5rem" },
            whileHover: { width: width! > height! ? "15rem" : "12.5rem" },
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
