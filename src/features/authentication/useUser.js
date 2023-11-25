import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  // thie query will get data from quesry that we set it manually
  const {
    isPending,
    data: user,
    fetchStatus,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    fetchStatus,
    user,
    isPending,
    isAuthenticated: user?.role === "authenticated",
  };
}
