import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBookingById, isPending: isDeleteBooking } = useMutation(
    {
      mutationFn: deleteBooking,
      onSuccess: () => {
        //onSuccess data will come from api call data that we fetch
        toast.success(`Booking successfully delete `);
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      },
      onError: () => {
        toast.error("Something went wrong please try agian");
      },
    }
  );

  return { deleteBookingById, isDeleteBooking };
}
