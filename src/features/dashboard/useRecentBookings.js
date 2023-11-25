import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBooking() {
  const [seatchParams] = useSearchParams();
  const date = !seatchParams.get("last") ? 7 : Number(seatchParams.get("last"));

  //subtract date
  const queryDate = subDays(new Date(), date).toISOString();

  const { isPending, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    //add value that change to array
    queryKey: ["bookings", `last-${date}`],
  });

  return { bookings, isPending };
}
