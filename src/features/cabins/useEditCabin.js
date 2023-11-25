import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addEditCabin } from "../../services/apiCabns";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isPending: isEdit } = useMutation({
    mutationFn: ({ newCabin, id }) => addEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (er) => toast.error(er.message),
  });

  return { updateCabin, isEdit };
}
