import { IconButton, Slider, Typography } from "@mui/joy";
import { memo, useState } from "react";
import { MdReplay } from "react-icons/md";

import { usePaginationStore } from "../../stores/usePaginationStore.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";

export const FooterRangeSlider = memo(function FooterRangeSlider() {
  const range = usePaginationStore((state) => state.range);
  const setRange = usePaginationStore((state) => state.setRange);
  const firstPage = usePaginationStore((state) => state.firstPage);

  const [sliderValue, setSliderValue] = useState(15);

  return (
    <Flexbox gap={1.5}>
      <Typography {...styles.typography}>Range:</Typography>
      <Flexbox gap={0.5}>
        <Slider
          {...styles.rangeSlider}
          onChange={(e, v) => setSliderValue(+v)}
          onChangeCommitted={(e, v) => setRange(`${+v}mi`)}
          value={sliderValue}
          valueLabelFormat={(v) => (v === 51 ? "\u221E mi" : `${+v} mi`)}
        />
        {range !== "15mi" && (
          <IconButton
            aria-label="Reset range slider"
            onClick={() => {
              setSliderValue(15);
              setRange("15mi");
              firstPage();
            }}
            {...styles.iconButton}
          >
            <MdReplay fontSize="1rem" />
          </IconButton>
        )}
      </Flexbox>
    </Flexbox>
  );
});

const styles = {
  iconButton: {
    size: "sm",
    sx: { "--IconButton-size": "1rem", "&:hover, &:active": { backgroundColor: "transparent" }, ml: 0.75 },
  },
  rangeSlider: {
    color: "neutral",
    defaultValue: 15,
    max: 51,
    min: 1,
    slotProps: { valueLabel: { sx: { backdropFilter: "blur(0.5rem)", background: "transparent" } } },
    sx: { minWidth: "8rem" },
    valueLabelDisplay: "auto",
  },
  typography: {
    level: "body-xs",
    sx: { userSelect: "none" },
  },
} as const;
