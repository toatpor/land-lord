import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useStayBooking() {
  const [seatchParams] = useSearchParams();
  const date = !seatchParams.get("last") ? 7 : Number(seatchParams.get("last"));

  //subtract date
  const queryDate = subDays(new Date(), date).toISOString();

  const { isPending, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    //add value that change to array
    queryKey: ["stays", `last-${date}`],
  });

  const stayConfirm = stays?.filter(
    (val) => val.status === "checked-in" || val.status === "checked-out"
  );
  return { stays, isPending, stayConfirm, date };
}
