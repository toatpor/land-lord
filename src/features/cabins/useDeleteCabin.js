import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabns";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isPending: deleteCabinLoad, mutate: deleteCabinData } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      // as soon we invalidate the cabin cache will re-fetch data again
      //invalidataQueries need to be call in queryClient
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("Cabin succesfully delete");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteCabinLoad, deleteCabinData };
}
