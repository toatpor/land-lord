import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: userLogout, isPending: isLogOut } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      toast.success("Log out succesfully");
      // remove everything from catche
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: () => {},
  });

  return { userLogout, isLogOut };
}
