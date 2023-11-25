import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBookingById() {
  const { id } = useParams();
  const { isPending, data, error } = useQuery({
    queryKey: ["bookingId", id],
    queryFn: () => getBooking(id),
    retry: false,
  });

  return { isPending, data, error };
}
