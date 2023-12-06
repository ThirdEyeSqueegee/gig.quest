import { IconButton, Slider, Typography } from "@mui/joy";
import { memo, useState } from "react";
import { MdReplay } from "react-icons/md";

import { usePaginationStore } from "../../stores/usePaginationStore.ts";
import { Flexbox } from "../atoms/Flexbox.tsx";

export const FooterRangeSlider = memo(function FooterRangeSlider() {
  const range = usePaginationStore((state) => state.range);
  const setRange = usePaginationStore((state) => state.setRange);
  const [sliderValue, setSliderValue] = useState(15);

  return (
    <Flexbox gap={1.5}>
      <Typography level="body-xs" sx={{ userSelect: "none" }}>
        Range:
      </Typography>
      <Flexbox gap={0.5}>
        <Slider
          color="neutral"
          valueLabelDisplay="auto"
          {...styles.rangeSlider}
          onChange={(e, v) => setSliderValue(+v)}
          onChangeCommitted={(e, v) => setRange(`${+v}mi`)}
          slotProps={{ valueLabel: { sx: { backdropFilter: "blur(0.5rem)", background: "transparent" } } }}
          value={sliderValue}
          valueLabelFormat={(v) => (v === 0 ? "\u221E mi" : `${+v} mi`)}
        />
        {range !== "15mi" && (
          <IconButton
            onClick={() => {
              setSliderValue(15);
              setRange("15mi");
            }}
            size="sm"
            sx={{ "&:hover, &:active": { backgroundColor: "transparent" }, "--IconButton-size": "1rem", ml: 0.75 }}
          >
            <MdReplay fontSize="small" />
          </IconButton>
        )}
      </Flexbox>
    </Flexbox>
  );
});

const styles = {
  rangeSlider: {
    defaultValue: 15,
    max: 50,
    sx: { minWidth: "8rem" },
  },
};
