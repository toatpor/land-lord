import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export const useUpdateSetting = function () {
  const queryClient = useQueryClient();
  const { isPending: isSettingLoad, mutate: updateSettingApi } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Setting is updated");
      queryClient.invalidateQueries({
        queryKey: ["setting"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isSettingLoad, updateSettingApi };
};
