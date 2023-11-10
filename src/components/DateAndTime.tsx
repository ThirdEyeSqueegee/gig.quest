export const DateAndTime = (props: { datetime?: string }) => {
  return (
    <>
      {new Date(props.datetime!).toLocaleString("en", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}
    </>
  );
};
