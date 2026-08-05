import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./queryFunctions";

export default function UserComponent() {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (!query.data) {
    <Stack>Loading...</Stack>;
  }

  return <Stack>{query.data?.firstName}</Stack>;
}
