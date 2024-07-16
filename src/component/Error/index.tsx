export const ErrorNotification = ({
  error = "Something went wrong",
}: {
  error?: string;
}) => {
  return <div>{error}</div>;
};
