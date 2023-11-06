import { Close, Search } from "@mui/icons-material";
import { IconButton, Input } from "@mui/joy";

export const SearchInput = (props: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Input
      sx={{
        px: 1,
        "&::before": {
          transition: "box-shadow .15s ease-in-out",
        },
      }}
      placeholder="Search..."
      startDecorator={<Search fontSize="small" />}
      {...(props.searchTerm !== "" && {
        endDecorator: (
          <IconButton size="sm" onClick={() => props.setSearchTerm("")}>
            <Close fontSize="small" />
          </IconButton>
        ),
      })}
      value={props.searchTerm}
      onChange={(e) => props.setSearchTerm(e.target.value)}
    />
  );
};
