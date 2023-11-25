import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export const useSetting = function () {
  const {
    isLoading: settingLoad,
    data: settingData,
    error,
  } = useQuery({
    queryKey: ["setting"],
    queryFn: getSettings,
  });

  return { settingLoad, settingData, error };
};
