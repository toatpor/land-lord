import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadAvatar } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (user) => {
      toast.success("Succeccfully update data");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (er) => toast.error(er.message),
  });

  return { updateUser, isUpdating };
}
