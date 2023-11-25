import { useQuery } from "@tanstack/react-query";
import { getALlCabin } from "../../services/apiCabns";

export function useCabin() {
  const {
    isPending: isCabinLoad,
    data: cabin,
    error,
  } = useQuery({
    //fetch data to cabin cache
    //identify each data
    queryKey: ["cabin"],
    //queryfunction need to return promise
    queryFn: getALlCabin,
  });

  return { isCabinLoad, cabin, error };
}
