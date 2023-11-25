import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addEditCabin } from "../../services/apiCabns";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreate } = useMutation({
    mutationFn: addEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (er) => toast.error(er.message),
  });

  return { createCabin, isCreate };
}
