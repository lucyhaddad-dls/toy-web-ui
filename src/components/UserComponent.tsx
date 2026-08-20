import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getInput } from "../models/queryFunctions";

export default function UserComponent() {
  const query = useQuery({
    queryKey: ["input"],
    queryFn: getInput,
  });

  if (!query.data) {
    <Stack>Loading...</Stack>;
  }

  return <Stack>{query.data?.fields}</Stack>;
}
