import { Link } from "@mui/joy";

export const Venue = (props: { name?: string }) => {
  return (
    <Link
      href={`https://www.google.com/maps/search/${props.name?.replaceAll(
        " ",
        "+",
      )}`}
    >
      {props.name}
    </Link>
  );
};
